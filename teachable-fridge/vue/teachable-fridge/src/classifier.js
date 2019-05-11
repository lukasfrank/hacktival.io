// Copyright 2018 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import "@babel/polyfill";
import * as mobilenetModule from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';
import * as knnClassifier from '@tensorflow-models/knn-classifier';

// Webcam Image size. Must be 227. 
const IMAGE_SIZE = 227;

// K value for KNN
const TOPK = 10;


class Main {
  constructor() {
    // Initiate variables
    this.training = -1; // -1 when no class is being trained
    this.videoPlaying = false;
    this.imageWidth = 0;
    this.imageHeight = 0;

    // window.setTimeout(() => {this.videoPlaying = true}, 3000);

    // Initiate deeplearn.js math and knn classifier objects
    this.bindPage();

    // Add video element to DOM
    document.body.appendChild(this.video);

    // setup download the current state
    const dlbutton = document.createElement('button')
    dlbutton.innerText = "Create classifier download link";
    dlbutton.addEventListener('click', () => {
      this.downloadClassifier()
    });
    document.body.appendChild(dlbutton);
  }

  async bindPage() {
    this.knn = knnClassifier.create();
    this.mobilenet = await mobilenetModule.load();
    console.log("Loaded mobilnet");

    this.start();
  }

  start() {
    if (this.timer) {
      this.stop();
    }
    this.timer = requestAnimationFrame(this.animate.bind(this));
  }

  stop() {
    cancelAnimationFrame(this.timer);
  }

  async animate() {
    if (this.videoPlaying) {
      // Get image data from video element
      const image = tf.fromPixels(this.video);

      let logits;
      // 'conv_preds' is the logits activation of MobileNet.
      const infer = () => this.mobilenet.infer(image, 'conv_preds');

      // Train class if one of the buttons is held down
      if (this.training != -1) {
        logits = infer();

        // Add current image to classifier
        this.knn.addExample(logits, this.training)
      }

      const numClasses = this.knn.getNumClasses();
      if (numClasses > 0) {

        // If classes have been added run predict
        logits = infer();
        const res = await this.knn.predictClass(logits, TOPK);

        for (let i = 0; i < NUM_CLASSES; i++) {

          // The number of examples for each class
          const exampleCount = this.knn.getClassExampleCount();

          // Make the predicted class bold
          if (res.classIndex == i) {
            this.infoTexts[i].style.fontWeight = 'bold';
          } else {
            this.infoTexts[i].style.fontWeight = 'normal';
          }

          // Update info text
          if (exampleCount[i] > 0) {
            this.infoTexts[i].innerText = ` ${exampleCount[i]} examples - ${res.confidences[i] * 100}%`
          }
        }
      }

      // Dispose image when done
      image.dispose();
      if (logits != null) {
        logits.dispose();
      }
    }

    this.timer = requestAnimationFrame(this.animate.bind(this));
  }

  downloadClassifier() {
    const state = this.knn.getClassifierDataset();
    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state));
    const link = document.createElement('a');
    link.href = "data:' + data + '";
    link.download = "model.json";
    link.text = "dowload";
    document.body.append(link);
  }
}

window.addEventListener('load', () => new Main());