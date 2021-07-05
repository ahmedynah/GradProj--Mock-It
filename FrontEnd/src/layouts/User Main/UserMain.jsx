import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { CallMissedSharp } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import React , { useState ,useContext,useEffect } from "react";
import { Button, Container } from "@material-ui/core";
import AppBar from "../../Components/App Bar/AppBar";
import MovieIcon from "@material-ui/icons/Movie";
import AttachmentIcon from "@material-ui/icons/Attachment";
import axios from 'axios'
import firebase from "../../config/Firebase";
import videoImg from "../../assets/img/background1.jpg";
import FavoriteIcon from "@material-ui/icons/Favorite";
import VideoPlayer from 'simple-react-video-thumbnail'
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
      <Grid container justify="space-between" alignItems="center" xs={4}>
        <h4 className="analysis__field--header">{field}:</h4>
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
        <video key={videoSrc} className="video" width="100%" controls>
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="video__info">
          <h3 className="info__title">{videoName}</h3>
          <div className="info__Date">
            <h5>Date: </h5>
            <p>{date || "25-06-2015"}</p>
          </div>
          <div className="info__OverallScore">
            <h5>Overall Score: </h5>
            <p>{overallScore || "70%"}</p>
          </div>
          <div className="info__SubmittedTo">
            <h5>Submitted To: </h5>
            <p>{submittedTo || "amazon.com"}</p>
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
  let videoContext1 = useContext(videoIDContext)

  const submit = async event => {
    event.preventDefault()
    const resultVideo = await postVideoAndPpt({ppt: file , video: videoFile, Name: Name});
    console.log("dy al result video");
    console.log(resultVideo);
    videoContext1.setVideo(resultVideo.videoPath)
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
  const handleText = (e) => {
    if(e.target.id === "files--name")
    setName(e.target.value);
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
          <Grid item xs={5} md={3}>
            <input
              type="text"
              name="files--name"
              onChange={handleText}
              id="files--name"
              aria-controls="none"
              placeholder="Name your files"
              required
            />
          </Grid>
          <Grid item xs={3} md={3} justify="flex-start">
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
function Reel({getVideos}) {

  const [videos, setVideos] = useState("");
  useEffect(()=>{
    getVideos().then((result)=>{
    
      console.log("REELL",result); 
      setVideos(result)
      console.log("videooosss",videos.length)
    })
    
}, [])
  
  
  return (
    <>
    
      {videos? videos.map((entry) => {
      console.log("videooosss",entry)
        return (  
          <div
            className="videoThumbnail"
          >
            <VideoPlayer style={{ pointerevents: "none"}} videoUrl={entry.videoID} snapshotAt={10} />
            <h6 className="videoThumbnail__title">{entry.name}</h6>
            <div className="videoThumbnail__overlay"></div>
          </div>
        );
      }): <div></div>}
    </>
  );
}

const getRecentVideos = async () => {
  const modelsRef = firestore.collection('modelData');
  // let user = ;
  if(firebase.auth().currentUser)
  {
    const snapshot = await modelsRef.where('uID', '==', firebase.auth().currentUser.uid).get();
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }  
    let list = [];
    snapshot.forEach(doc => {
      list.push(doc.data());
    });
    return list;
  }
};

function Home({ video, data, reel, Tips, upload }) {
  
  const analysis = {
    first: "70%",
    second: "poor",
    third: "cool",
    fourth: "3latool",
    fifth: "forSchool",
    sixth: "ya 2moor",
  };
  return (
    <Grid
      item
      direction="column"
      justify="space-between"
      spacing={0}
      xs={10}
      // className="main"
      style={{  boxSizing: "border-box", margin:"0px auto" }}
    >
      {/* <> */}
      <Grid
        container
        item
        xs={12}
        justify="space-evenly"
        alignItems="center"
        style={{ margin: "10px" }}
      >
        <Grid
          xs="12"
          md="5"
          justify="flex-start"
          style={{ position: "relative" }}
        >
          <Tip />
        </Grid>
        <Grid item xs="12" md="5" justify="space-around" alignItems="center">
          <UploadElements  />
        </Grid>
      </Grid>
      <Grid
        container
        item
        xs={12}
        justify="space-evenly"
        alignItems="stretch"
        style={{ margin: "10px" }}
        spacing={2}
      >
        <MainVideo videoSrc={video} videoName="Nature" />
        <MainAnalysis analysis={analysis} />
      </Grid>
      <Grid
        container
        item
        direction="column"
        xs={12}
        justify="center"
        alignItems="center"
      >
        <h4 className="ReelHeader">Recent Videos</h4>
        <div className="videoReel">
          <Reel getVideos={getRecentVideos} />
        </div>
      </Grid>
      {/* </> */}
    </Grid>
  );
}
function SideBar() {
  return (
    <ul className="sideBarMenu">
      <li className="sideBarMenu__item">
        {" "}
        <span className="menuItem__text">
          <Link className="homeLink" to="/">
            Home
          </Link>
        </span>
      </li>
      <li className="sideBarMenu__item">
        {" "}
        <span className="menuItem__text">Analytics</span>
      </li>
      <li className="sideBarMenu__item">
        {" "}
        <span className="menuItem__text">Profile</span>
      </li>
    </ul>
  );
}
function Footer() {
  return (
    <>
      <Grid item xs={5} className="footer">
        <h4>Mockit</h4>
      </Grid>
      <Grid item xs={5} className="footer" justify="center" alignItems="center">
        <h4 style={{ display: "inline-block" }}>Developed with</h4>
        <FavoriteIcon style={{ fontSize: "10pt", margin: "0px 2px -2px" }} />
      </Grid>
    </>
  );
}
const videoIDContext = React.createContext({
  video:"",
  setVideo: () => {}
});
function UserMain() {

  const [video, setVideo] = useState("");
  
  return (
    <Grid container direction="column" style={{ height: "100%" }}>
      <WavesOpacity />
      <Grid item xs={12} style={{ flex: "0.01" }}>
        <AppBar />
      </Grid>
      <Grid
        container
        item
        xs={12}
        justify="space-around"
        style={{
          maxHeight: "100%",
          flex: "1",
          boxSizing: "border-box",
          padding:"10px",
          overflowY:"auto",
        }}
        spacing={0}
      >
        <Grid
          direction="column"
          justify="flex-start"
          container
          item
          xs={0}
          md={2}
          className=""
        >
          <Grid item xs="1" ></Grid>
          <SideBar />
        </Grid>
        <Grid
          container
          item
          justify="space-between"
          xs={12}
          md={10}
          className="main"
        >
          <videoIDContext.Provider value = {{video,setVideo}}>
            <Home video={video} />
          </videoIDContext.Provider >
        </Grid>
      </Grid>
    </Grid>
  );
}

export default UserMain;
