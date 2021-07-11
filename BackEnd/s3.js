require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')
const express = require("express")
const app = express();

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

// uploads a file to s3
function uploadFile(file,type) {
  const fileStream = fs.createReadStream(file.path)
  // if (type == "ppt")
  // {
  //   console.log(type);
  //   app.post("https://mockit.herokuapp.com/mockit/upload_slides/",(req,res) => {
  //     console.log("i am hereeeeeeeeeeee");
  //       res.sendFile(fileStream)
  //   });
  // }
    
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename
  }
  // promise to not use callback function
  return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile


// downloads a file from s3
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  }

  return s3.getObject(downloadParams).createReadStream()
}
exports.getFileStream = getFileStream