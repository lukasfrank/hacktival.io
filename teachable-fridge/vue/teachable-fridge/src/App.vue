<template>
  <v-app>
    <v-toolbar app>
      <v-layout>
        <v-flex xs1 pa-3>
          <button class="torch-btn" v-on:click="setLight(true)">🔦 on</button>
        </v-flex>  
        <v-flex xs1 pa-3>
          <button class="torch-btn" v-on:click="setLight(false)">🔦 off</button>
        </v-flex>  
        <v-divider vertical />
        <v-flex xs9 pa-3>
          <v-select
            v-model="fridgeSrc"
            :items="devices"
            label="Select device"
            item-text="name"
            item-value="url"
            solo
          ></v-select>
        </v-flex>
        <v-flex xs2 pa-3 class="torch-btn" >
          Model: {{ modelLoaded ? "✔️" : "❌" }}
        </v-flex>
      </v-layout>     
    </v-toolbar>
    <v-content class="text-xs-center">
      <div class="fridgecam">
        <img v-bind:class="imageClass" alt="Fridgcam is loading..." :src="fridgeSrc" crossorigin="anonymous" ref="fridgeImage"
        >
        <br>

        <v-layout>
          <v-flex xs1 pa-3 />  
          <v-flex xs2 pa-3>
            <v-card class="text-xs-center">
              <v-card-title primary-title><h3 class="headline ml-3">{{ clsLabel1 | filterLabel }}</h3></v-card-title>
              <img class="image-crop" :src="imageCrop1" ref="img1" />
              <br>
              <v-combobox hide-no-data :items="labelNames" label="New Class" v-model="label1"/><v-btn v-on:mousedown="train = 1" v-on:mouseup="resetTrain" :disabled="label1 == ''">🔬 Train</v-btn>
            </v-card>
          </v-flex>
          <v-flex xs2 pa-3>
            <v-card>
              <v-card-title primary-title><h3 class="headline ml-3">{{ clsLabel2 | filterLabel }}</h3></v-card-title>
              <img class="image-crop" :src="imageCrop2" ref="img2" />
              <br>
              <v-combobox hide-no-data :items="labelNames" label="New Class" v-model="label2"/><v-btn v-on:mousedown="train = 2" v-on:mouseup="resetTrain" :disabled="label2 == ''">🔬 Train</v-btn>
            </v-card>
          </v-flex>
          <v-flex xs2 pa-3>
            <v-card>
              <v-card-title primary-title><h3 class="headline ml-3">{{ clsLabel3 | filterLabel }}</h3></v-card-title>
              <img class="image-crop" :src="imageCrop3" ref="img3" />
              <br>
              <v-combobox hide-no-data :items="labelNames" label="New Class" v-model="label3"/><v-btn v-on:mousedown="train = 3" v-on:mouseup="resetTrain" :disabled="label3 == ''">🔬 Train</v-btn>
            </v-card>
          </v-flex>
        <v-flex xs2 pa-3>
          <v-card>
            <v-card-title primary-title><h3 class="headline ml-3">{{ clsLabel4 | filterLabel }}</h3></v-card-title>
            <img class="image-crop" :src="imageCrop4" ref="img4" />
            <br>
              <v-combobox hide-no-data :items="labelNames" label="New Class" v-model="label4"/><v-btn v-on:mousedown="train = 4" v-on:mouseup="resetTrain" :disabled="label4 == ''">🔬 Train</v-btn>
          </v-card>
        </v-flex>
        <v-flex xs2 pa-3>
          <v-card>
            <v-card-title primary-title><h3 class="headline ml-3">Trained labels:</h3></v-card-title>
            <ul class="text-xs-left">
              <li v-for="item in sortedLabels" :key="item.label">
              <b>{{ item.label }}</b>: {{ item.count }}
              </li>
            </ul>
            <v-btn v-on:click="downloadModel">Dowload model</v-btn>
          </v-card>
        </v-flex>
      </v-layout>
      </div>
    </v-content> 
  </v-app> 
</template>

<script>
import * as _ from 'lodash';
import {getClippedRegion} from './image-clip';
import * as classifier from './classifier';

const UNKNOWN_LABEL = "???";
const PREDEFINED_LABELS = [
  ""
];

export default {
  name: 'Fridgecam',
  components: {
  },
  data: () => ({
    imageWidth: 0,
    imageHeight: 0,
    timer: null,
    imageClass: '',
    imageCrop1: null,
    imageCrop2: null,
    imageCrop3: null,
    imageCrop4: null,
    label1: "",
    label2: "",
    label3: "",
    label4: "",
    clsLabel1: UNKNOWN_LABEL,
    clsLabel2: UNKNOWN_LABEL,
    clsLabel3: UNKNOWN_LABEL,
    clsLabel4: UNKNOWN_LABEL,
    modelLoaded: false,
    train: -1,
    trainedLabels: [],
    devices: [],
    fridgeSrc: '',
  }),
  created: async function() {
    this.getDevices();
    await classifier.start();
    this.modelLoaded = true;
  },
  filters: {
    filterLabel: function(text) {
      return text ? text : '???';
    }
  },
  mounted: function() {
    this.$refs.fridgeImage.onload = this.imageLoaded;
  },
  computed: {
    sortedLabels: function() {
      return _(this.trainedLabels).sortBy('count').reverse().value();
    },
    labelNames: function() {
      return this.trainedLabels.map(label => label.label);
    }
  },
  methods: {
    resetTrain: function() {
      this.train = -1;
    },
    setLight: function(status) {
      fetch('http://localhost:3000/devices', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "light": status ? 'on': 'off'
        }),
      });
    },
    getDevices: async function() {
      const response = await fetch('http://localhost:3000/devices', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
      });
      this.devices = await response.json();
    },
    imageLoaded: function() {
      this.imageWidth = this.$refs.fridgeImage.width;
      this.imageHeight = this.$refs.fridgeImage.height;

      this.imageClass = "fridgecam-img-size-changed";
      window.setTimeout(() => {
        this.timer = requestAnimationFrame(this.handleImage.bind(this));
      });
    },
    handleImage: async function() {
      try {
        const cropWidth = Math.round(this.imageWidth / 4);
        this.imageCrop1 = getClippedRegion(this.$refs.fridgeImage, 0, 0, cropWidth, this.imageHeight).toDataURL("image/png");
        this.imageCrop2 = getClippedRegion(this.$refs.fridgeImage, cropWidth, 0, cropWidth, this.imageHeight).toDataURL("image/png");
        this.imageCrop3 = getClippedRegion(this.$refs.fridgeImage, 2 * cropWidth, 0, cropWidth, this.imageHeight).toDataURL("image/png");
        this.imageCrop4 = getClippedRegion(this.$refs.fridgeImage, 3 * cropWidth, 0, cropWidth, this.imageHeight).toDataURL("image/png");

        const prom1 = classifier.infer(this.$refs.img1, this.train == 1 ? this.label1 : "");
        const prom2 = classifier.infer(this.$refs.img2, this.train == 2 ? this.label2 : "");
        const prom3 = classifier.infer(this.$refs.img3, this.train == 3 ? this.label3 : "");
        const prom4 = classifier.infer(this.$refs.img4, this.train == 4 ? this.label4 : "");

        [this.clsLabel1, this.clsLabel2, this.clsLabel3, this.clsLabel4] = await Promise.all([prom1, prom2, prom3, prom4]);
        this.trainedLabels = classifier.getLabelsWithCount();
      } catch (e) {
        console.error(e);
      }
      this.timer = window.setTimeout(this.handleImage.bind(this), 300);
      // this.timer = requestAnimationFrame(this.handleImage.bind(this));
    },
    downloadModel: function() {
      classifier.downloadClassifier();
    }
  }
}
</script>

<style scoped>
img.fridgecam-img-size-changed {
  width: 1000px;
}
img.image-crop {
  width: 227px;
  height: 227px;
}
div.image-train-card {
  display: inline-block;
  margin-right: 3px;
  text-align: center;
}
.torch-btn {
  font-size: 30px;
}
div.left {
  text-align: left;
}
</style>
