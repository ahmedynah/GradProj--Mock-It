import React from 'react';
import * as bodyPix from "@tensorflow-models/body-pix";
import * as tf from '@tensorflow/tfjs';
import t from "./assets/img/IMAG2188 (3).jpg";
// import { MarvinImage } from "marvinj";


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
//    let image = new MarvinImage();
    // image.load(t, imageLoaded);

    // function imageLoaded(){
    //     image.setColorToAlpha(0, 0);	
    //     image.draw(canvas);
    // }
    var canvas = document.getElementById("canvas2"),
    ctx = canvas.getContext("2d"),
    image = document.getElementById("canvas");

    // Draw the mask image on top of the original image onto a canvas.
    // The colored part image will be drawn semi-transparent, with an opacity of
    // 0.7, allowing for the original image to be visible under.

    canvas.height = image.height;
    canvas.width = image.width;
    ctx.drawImage(image,0,0);
    
    console.log(img.height);
    console.log(img.width);
    console.log(canvas.height);
    console.log(canvas.width);
    console.log(image.height);
    console.log(image.width);
    
    var imgd = ctx.getImageData(0, 0, image.height, image.width),
        pix = imgd.data,
        newColor = {r:0,g:0,b:0, a:0};
    
    for (var i = 0, n = pix.length; i <n; i += 4) {
        var r = pix[i],
                g = pix[i+1],
                b = pix[i+2];
    
            if(r == 0&& g == 0 && b == 0){ 
                // Change the white to the new color.
                pix[i] = newColor.r;
                pix[i+1] = newColor.g;
                pix[i+2] = newColor.b;
                pix[i+3] = newColor.a;
            }
    }
    
    ctx.putImageData(imgd, 0, 0);
        	
    }
    return (
        <div>
            <img id="image"  src={t}></img>
            <img id="talta"></img>
            <canvas id="canvas" ></canvas>
            <br></br>
            <canvas id="canvas2" ></canvas>
            <button  onClick={loadAndUseBodyPix} >yes</button>
        </div>
    )
}
