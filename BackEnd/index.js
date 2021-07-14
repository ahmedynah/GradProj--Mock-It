const express = require("express");
var cors = require('cors');
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const path = require("path");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { uploadFile, getFileStream } = require("./s3");
const app = express();

const os = require('os');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const ffmpeg = require('fluent-ffmpeg');
const axios = require('axios');
const FormData = require('form-data');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

app.get('/', (req, res) => {
  res.send('Hello World!')
})
const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};

app.use(cors(corsOpts));
app.get("/videos/:key", (req, res) => {
  console.log("ss");
    console.log(req.params);
    const key = req.params.key;
    const readStream = getFileStream(key);
    console.log(readStream.key);
    readStream.pipe(res);
  });

async function sendAudioToModels(audio) 
{
   const fileStream = fs.createReadStream(__dirname+audio)
  const formData = new FormData();
  formData.append("audio", fileStream)
  const result = await axios
  .post("https://mockit.herokuapp.com/upload_audio/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
  .catch(function (error) {
    console.log(error);
  });
}

 function convertVideoToAudio(videoPath,videoID){
  
  const fileStream = fs.createReadStream(videoPath)
  
  let audioPath = ""
  // console.log(fileStream,"hena222222222");
  var proc = new ffmpeg(fileStream)
  .toFormat('wav')

  .on('end', function(stdout,stderr) {
    console.log( stdout,' file has been converted successfully');
  })
  .on('error', function(err) {
    console.log('an error happened: ' + err.message);
  })
  // save to file <-- the new file I want -->
  .saveToFile(videoID+'.wav')
  audioPath = "/"+videoID
  sendAudioToModels(audioPath)
}

// create middleware function (upload.single)
app.post('/videos', upload.array('video', 2), async (req, res) => {
  const file = req.files
  
  // res.send('Recieved file successfuly. ' + file.originalname)
  // console.log(req);
  // console.log(file)

  // PreProcessing (Video to Audio)

  // apply filter
  // resize 
  const unlinkAll = async (path) =>
  {
    console.log(path);
    await unlinkFile(path)
  }
  console.log(file[0].path, "henaaaaaaaaaaaaaaaaaaaaa");
  currentVideoID = file[0].path.split("/")[1];
  currentPptID = file[1].path.split("/")[1];
  const result = await uploadFile(file[0],"video")
  const result2 = await uploadFile(file[1],"ppt")
   convertVideoToAudio(file[0].path, currentVideoID)
  // unlinkAll("./"+videoID+'.wav')
  // console.log(file[0].path);
  file.forEach((file) =>{
    console.log(file.path);
    unlinkAll(file.path)
  })
  console.log(result)
  const description = req.body.description
  res.send({videoPath: `/videos/${result.Key}` , pptPath: `/videos/${result2.Key}`});
  //res.send({videoPath: })
})

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("App is listening on port " + port));

