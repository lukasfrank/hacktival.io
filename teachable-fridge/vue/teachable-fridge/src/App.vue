<template>
  <div class="fridgecam">
    <img v-bind:class="imageClass" alt="Fridgcam is loading..." src="http://192.168.172.97:8080/video" crossorigin="anonymous" ref="fridgeImage"
      onload="this."
    >
    <br>

    <div class="image-train-card">
      <img class="image-crop" :src="imageCrop1" />
      <br>
      <input type="text" placeholder="New Class" /><button>Train</button>
    </div>
    <div class="image-train-card">
      <img class="image-crop" :src="imageCrop2" />
      <br>
      <input type="text" placeholder="New Class" /><button>Train</button>
    </div>
    <div class="image-train-card">
      <img class="image-crop" :src="imageCrop3" />
      <br>
      <input type="text" placeholder="New Class" /><button>Train</button>
    </div>
    <div class="image-train-card">
      <img class="image-crop" :src="imageCrop4" />
      <br>
      <input type="text" placeholder="New Class" /><button>Train</button>
    </div>
  </div>
</template>

<script>
import {getClippedRegion} from './image-clip'; 

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
  }),
  mounted: function() {
    this.$refs.fridgeImage.onload = this.imageLoaded;
  },
  methods: {
    imageLoaded: function() {
      this.imageWidth = this.$refs.fridgeImage.width;
      this.imageHeight = this.$refs.fridgeImage.height;

      this.imageClass = "fridgecam-img-size-changed";
      window.setTimeout(() => {
        this.timer = requestAnimationFrame(this.clipImage.bind(this));
      });
    },
    clipImage: function() {
      try {
        const cropWidth = Math.round(this.imageWidth / 4);
        this.imageCrop1 = getClippedRegion(this.$refs.fridgeImage, 0, 0, cropWidth, this.imageHeight).toDataURL("image/png");
        this.imageCrop2 = getClippedRegion(this.$refs.fridgeImage, cropWidth, 0, cropWidth, this.imageHeight).toDataURL("image/png");
        this.imageCrop3 = getClippedRegion(this.$refs.fridgeImage, 2 * cropWidth, 0, cropWidth, this.imageHeight).toDataURL("image/png");
        this.imageCrop4 = getClippedRegion(this.$refs.fridgeImage, 3 * cropWidth, 0, cropWidth, this.imageHeight).toDataURL("image/png");
      } catch (e) {
        console.error(e);
      }
      this.timer = window.setTimeout(this.clipImage.bind(this), 1000);
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
</style>
