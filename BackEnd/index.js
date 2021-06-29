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
    console.log(req.params);
    const key = req.params.key;
    const readStream = getFileStream(key);
    console.log(readStream.key);
    readStream.pipe(res);
  });

// create middleware function (upload.single)
app.post('/videos', upload.single('video'), async (req, res) => {
  const file = req.file
  res.send('Recieved file successfuly. ' + file.originalname)
  console.log(file)

  // apply filter
  // resize 

  const result = await uploadFile(file)
  await unlinkFile(file.path)
  console.log(result)
  const description = req.body.description
  res.send({videoPath: `/videos/${result.Key}`})
})

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);