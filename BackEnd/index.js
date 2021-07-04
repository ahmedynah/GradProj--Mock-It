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

// create middleware function (upload.single)
app.post('/videos', upload.array('video', 2), async (req, res) => {
  const file = req.files
  // res.send('Recieved file successfuly. ' + file.originalname)
  // console.log(req);
  // console.log(file)

  // apply filter
  // resize 
  const unlinkAll = async (path) =>
  {
    console.log(path);
    await unlinkFile(path)
  }
  currentVideoID = file[0].path.split("/")[1];
  currentPptID = file[1].path.split("/")[1];
  console.log(file[0].path.split("/")[1]);
  const result = await uploadFile(file[0])
  const result2 = await uploadFile(file[1])
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
app.listen(port);

console.log("App is listening on port " + port);