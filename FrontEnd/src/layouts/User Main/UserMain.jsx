import { Grid } from "@material-ui/core";
import { CallMissedSharp } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import React , { useState } from "react";
import { Button } from "@material-ui/core";
import AppBar from "../../Components/App Bar/AppBar";
import MovieIcon from "@material-ui/icons/Movie";
import AttachmentIcon from "@material-ui/icons/Attachment";
import axios from 'axios'
import firebase from "../../config/Firebase";
import video from "../../assets/img/video.mp4";
import "./UserMain.css";
const firestore = firebase.firestore();

async function postVideoAndPpt({ppt, video, Name}) {
  const formData = new FormData();
  formData.append("video", video)
  formData.append("video", ppt)
  
  const result = await axios.post('http://localhost:5000/videos', formData, { headers: {'Content-Type': 'multipart/form-data'}})
  .catch(function (error) {
    console.log(error);
  });

  console.log(result.data);
   let pushData = firestore.collection("modelData").doc();
  await pushData.set({
    uID: firebase.auth().currentUser.uid,
    videoID: result.data.videoPath,
    pptID: result.data.pptPath,
    results: [],
    name: Name
  });

  return result.data
}

function iterateData(obj) {
  let counter = 0;

  const ar = [];
  const rows = [];
  for (const field in obj) {
    let element = (
      <Grid justify="center" alignItems="center" xs={6}>
        <h4 className="analysis__field--header">{field}</h4>
        <span className="analysis__field--high">
          {" "}
          {"\u00A0"}
          {obj[field]}
        </span>
      </Grid>
    );
    console.log(obj[field]);
    ar.push(element);
    console.log(ar);
    if (counter % 2 === 1) {
      rows.push(<div className="analysis__field">{[...ar]}</div>);
      ar.shift();
      ar.shift();
    }
    counter++;
  }
  console.log(rows);
  return rows;
}

function MainAnalysis({ analysis }) {
  return (
    <Grid item xs={12} md={5} justify="center" alignItems="center">
      <div className="main__analysis">{iterateData(analysis)}</div>
    </Grid>
  );
}

function MainVideo({ videoSrc, videoName, date, overallScore, submittedTo }) {
  return (
    <Grid
      item
      direction="column"
      xs={12}
      md={5}
      justify="center"
      alignItems="start"
    >
      <div className="video--container">
        <video className="video" width="100%" controls>
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="video__info">
          <h3 className="info__title">{videoName}</h3>
          <div className="info__Date">
            <h5>Date </h5>
            <p>{date||"25-06-2015"}</p>
          </div>
          <div className="info__OverallScore">
            <h5>Overall Score </h5>
            <p>{overallScore||"70%"}</p>
          </div>
          <div className="info__SubmittedTo">
            <h5>Submitted To: </h5>
            <p>{submittedTo||"amazon.com"}</p>
          </div>
        </div>
      </div>
    </Grid>
  );
}
function TiltShape() {
  return (
    <div class="custom-shape-divider-top-1624904894">
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M1200 120L0 16.48 0 0 1200 0 1200 120z"
          class="shape-fill"
        ></path>
      </svg>
    </div>
  );
}
function WavesOpacity() {
  return (
    <div class="custom-shape-divider-top-1624973160">
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
          opacity=".25"
          class="shape-fill"
        ></path>
        <path
          d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
          opacity=".5"
          class="shape-fill"
        ></path>
        <path
          d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
          class="shape-fill"
        ></path>
      </svg>
    </div>
  );
}
function UploadElements() {
  const [file, setFile] = useState()
  const [videoFile, setVideoFile] = useState()
  const [videos, setVideos] = useState([])
  const [Name, setName] = useState("")
  const submit = async event => {
    event.preventDefault()
    const resultVideo = await postVideoAndPpt({ppt: file , video: videoFile, Name: Name});
    setVideos([resultVideo.video, ...videos])
    // console.log(pptFiles);
    // console.log(videos);
  }

  const videoFileSelected = event => {
    const videoFile = event.target.files[0]
		setVideoFile(videoFile)
	}

  const fileSelected = event => {
    const file = event.target.files[0]
		setFile(file)
	}
  return (
    <div className="floatingDiv" style={{ height: "200px" }}>
      <h3 className="uploadHeader">Upload New</h3>
      <form onSubmit={submit} style={{ width: "100%" }}>
        <Grid
          container
          item
          direction="row"
          justify="space-evenly"
          alignItems="center"
          xs={12}
        >
          <Grid item xs={2} md={3}>
            <label htmlFor="upload--video" className="uploadLabel">
              <MovieIcon style={{ color: "red" }} />
              <span>Video</span>
            </label>
            <input
              type="file"
              onChange={videoFileSelected}
              accept="video/*"
              name="upload--video"
              id="upload--video"
              aria-controls="none"
              required
            />
          </Grid>
          <Grid item xs={2} md={3}>
            <label htmlFor="upload--slides" className="uploadLabel">
              <AttachmentIcon style={{ color: "green" }} />
              <span>Slides</span>
            </label>
            <input
              type="file"
              onChange={fileSelected}
              accept="file/*"
              name="upload--slides"
              id="upload--slides"
              aria-controls="none"
              required
            />
          </Grid>
          <Grid item xs={6} md={3} justify="flex-start">
            {/* <button type="submit" className="submitBtn">Upload</button> */}
            <Button type="submit" id="submitBtn">
              {" "}
              Upload
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
function Tip() {
  return (
    <div className="floatingDiv tip">
      <h3 className="tip__header">Presentation Tip:</h3>
      <p className="tip__content">
        fonts must be visilbe for blind people... LOL
      </p>
    </div>
  );
}
function Reel(v){
  const videos = [video,video,video, video,video];
return (
  <div></div>
  // videos.map(entry=>{
  //   return (
  //     <div>
  //       video
  //     </div>
  //   )
  // })
)
}

function Home({ video, data, reel, Tips, upload }) {
  const analysis = {
    first: "70%",
    second: "poor",
    third: "cool",
    fourth: "3latool",
    fifth: "forSchool",
    sixth: "ya 2moor",
  };
  // const vide
  return (
    <Grid
      direction="column"
      justify="center"
      alignItems="center"
      style={{ padding: "10px", boxSizing: "border-box" }}
    >
      <Grid
        container
        item
        xs={12}
        justify="space-evenly"
        alignItems="center"
        style={{ margin: "10px" }}
      >
        <Grid xs="12" md="5" justify="flex-start" style={{ position: "relative" }}>
          <Tip />
        </Grid>
        <Grid xs="12" md="5" justify="space-around" alignItems="center">
          <UploadElements />
        </Grid>

      </Grid>
      <Grid
        container
        item
        xs={12}
        justify="space-evenly"
        alignItems="center"
        style={{ margin: "10px" }}
      >
        <MainVideo videoSrc={video} videoName="Nature" />
        <MainAnalysis analysis={analysis} />
      </Grid>
      <Grid xs={12} justify="space-between" alignItems="center">
        <Reel vidoes={video}/>
      </Grid>
    </Grid>
  );
}

function UserMain() {
   const [video, setVideo] = useState("/videos/9512933288b3c21ab7b2fc5ad1acafa9");
  return (
    <div className="userMain--root">
      <WavesOpacity />
      <Grid container item xs={12} style={{ marginBottom: "5px" }}>
        <AppBar />
      </Grid>
      <Grid container xs={12} style={{ height: "100%" }}>
        <Grid
          direction="column"
          justify="flex-start"
          spacing={1}
          container
          item
          xs={0}
          md={2}
          className="borderred"
        ></Grid>
        <Grid container direction="column" xs={12} md={10}>
          <Grid
            container
            item
            direction="column"
            spacing={1}
            lg={12}
            className="main"
          >
            <Home video={video} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default UserMain;
