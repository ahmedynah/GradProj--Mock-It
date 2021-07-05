import React from 'react';
import * as bodyPix from "@tensorflow-models/body-pix";
import * as tf from '@tensorflow/tfjs';
import t from "./assets/img/test.png";
import { MarvinImage } from "marvinj";


export default function test() {
    async function loadAndUseBodyPix() {
        console.log("innn")
   const net = await bodyPix.load({
    architecture: 'MobileNetV1',
    outputStride: 16,
    multiplier: 0.75,
    quantBytes: 2
    });
   // BodyPix model loaded
        const img = document.getElementById('image');
        const img1 = document.getElementById('talta');
        // arguments for estimating person segmentation.

      const segmentation = await net.segmentPerson(img);
      console.log(segmentation);
    const coloredPartImage = bodyPix.toMask(segmentation, true);
    const opacity = 1;
    const flipHorizontal = false;
    const maskBlurAmount = 1;
    var canvas = document.getElementById('canvas');
    // Draw the mask image on top of the original image onto a canvas.
    // The colored part image will be drawn semi-transparent, with an opacity of
    // 0.7, allowing for the original image to be visible under.
    bodyPix.drawMask(
        canvas, img, coloredPartImage, opacity, maskBlurAmount,
        flipHorizontal);
   let image = new MarvinImage();
    image.load(t, imageLoaded);

    function imageLoaded(){
        image.setColorToAlpha(0, 0);	
        image.draw(canvas);
    }
        	
    }
    return (
        <div>
            <img id="image"  src={t}></img>
            <img id="talta"></img>
            <canvas id="canvas" ></canvas>
            <button  onClick={loadAndUseBodyPix} >yes</button>
        </div>
    )
}
