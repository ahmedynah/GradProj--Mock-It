import { Grid } from "@material-ui/core";
import React, { useState, useContext, useEffect } from "react";
import { Button, Container, CssBaseline } from "@material-ui/core";
import AppBar from "../../Components/App Bar/AppBar";
import MovieIcon from "@material-ui/icons/Movie";
import AttachmentIcon from "@material-ui/icons/Attachment";
import axios from "axios";
import firebase from "../../config/Firebase";
import { WavesOpacity } from "../../assets/svg/svg";
import SideBar from "../../Components/SideBar/SideBar";
import "./UserMain.css";
const firestore = firebase.firestore();

async function postVideoAndPpt({ ppt, video, Name }) {
  const formData = new FormData();
  const pptdata = new FormData();
  formData.append("video", video);
  formData.append("video", ppt);
  pptdata.append("ppt", ppt);
  console.log(pptdata.data,"1111");
  console.log(pptdata,"2222");
  const result2 = await axios
    .post("https://polar-peak-14386.herokuapp.com/https://mockit.herokuapp.com/mockit/upload_slides/", pptdata, {
      headers: { "Content-Type": "multipart/form-data" , "Access-Control-Allow-Origin": "*" , "Access-Control-Allow-Credentials": "true"},
      validateStatus: (status) => {
        return true; // I'm always returning true, you may want to do it depending on the status received
      },
    }).then( (result) =>{
      console.log(result,"tamaaaaaaam");
    })
    .catch(function (error) {
      console.log(error);
    });

  const result = await axios
    .post("http://localhost:5000/videos", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .catch(function (error) {
      console.log(error);
    });
    
  console.log(result.data);
  const date = new Date();
  let pushData = firestore.collection("modelData").doc();
  await pushData.set({
    uID: firebase.auth().currentUser.uid,
    videoID: result.data.videoPath,
    pptID: result.data.pptPath,
    date: date.getDate(),
    results: [],
    name: Name,
  });

  return result.data;
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
            <p>{date || new Date().toLocaleDateString()}</p>
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


function UploadElements() {
  const [file, setFile] = useState();
  const [videoFile, setVideoFile] = useState();
  const [videos, setVideos] = useState([]);
  const [Name, setName] = useState("");
  let videoContext1 = useContext(videoIDContext);

  const submit = async (event) => {
    event.preventDefault();
    const resultVideo = await postVideoAndPpt({
      ppt: file,
      video: videoFile,
      Name: Name,
    });
    console.log("dy al result video");
    console.log(resultVideo);
    videoContext1.setVideo({
      vidID: resultVideo.videoPath,
      vidName: Name,
      date: new Date().toLocaleDateString(),
    });
    setVideos([resultVideo.video, ...videos]);
    // console.log(pptFiles);
    // console.log(videos);
  };

  const videoFileSelected = (event) => {
    const videoFile = event.target.files[0];
    setVideoFile(videoFile);
  };

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };
  const handleText = (e) => {
    if (e.target.id === "files--name") setName(e.target.value);
  };
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
function Reel({ getVideos }) {
  const [videos, setVideos] = useState("");
  useEffect(() => {
    getVideos().then((result) => {
      console.log("REELL", result);
      setVideos(result);
      console.log("videooosss", videos.length);
    });
  }, []);
  let videoContext = useContext(videoIDContext);
  const handleOnClick = (event) => {
    console.log(event.target);
    videos.forEach((vid) => {
      if (vid.videoID === event.target.id)
        videoContext.setVideo({
          vidID: vid.videoID,
          vidName: vid.name,
          date: vid.date,
        });
    });
  };

  return (
    <>
      {videos ? (
        videos.map((entry) => {
          console.log("videooosss", entry);
          return (
            <div
              className="videoThumbnail"
              id={entry.videoID}
              onClick={handleOnClick}
              style={{ cursor: "pointer" }}
            >
              <video
                on
                style={{ pointerEvents: "none" }}
                key={entry.videoID}
                className="videoThumbnail"
              >
                <source src={entry.videoID}></source>
              </video>
              <h6
                style={{ pointerEvents: "none" }}
                className="videoThumbnail__title"
              >
                {entry.name}
              </h6>
              <div
                style={{ pointerEvents: "none" }}
                className="videoThumbnail__overlay"
              ></div>
            </div>
          );
        })
      ) : (
        <div></div>
      )}
    </>
  );
}

const getRecentVideos = async () => {
  const modelsRef = firestore.collection("modelData");
  // let user = ;
  if (firebase.auth().currentUser) {
    const snapshot = await modelsRef
      .where("uID", "==", firebase.auth().currentUser.uid)
      .get();
    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }
    let list = [];
    snapshot.forEach((doc) => {
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
      style={{ boxSizing: "border-box", margin: "0px auto" }}
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
          <UploadElements />
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
        <MainVideo
          videoSrc={video.vidID}
          videoName={video.vidName}
          date={video.date}
        />
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



const videoIDContext = React.createContext({
  video: {},
  setVideo: () => {},
});
function UserMain() {
  const [video, setVideo] = useState({});

  return (
    <>
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
          padding: "10px",
          overflowY: "auto",
        }}
        spacing={0}
      >
        <SideBar />
        <Grid
          container
          item
          justify="space-between"
          xs={12}
          md={10}
          className="main"
        >
          <videoIDContext.Provider value={{ video, setVideo }}>
            <Home video={video} />
          </videoIDContext.Provider>
        </Grid>
      </Grid>
    </Grid>
    </>
  );
}

export default UserMain;
