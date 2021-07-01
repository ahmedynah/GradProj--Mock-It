import { useState } from 'react'
import axios from 'axios'


async function postVideoAndPpt({video, video2}) {
  const formData = new FormData();
  formData.append("video", video)
  formData.append("video", video2)

  
  const result = await axios.post('http://localhost:5000/videos', formData, { headers: {'Content-Type': 'multipart/form-data'}})
  .catch(function (error) {
    console.log(error);
  });
  console.log(result.data);
  return result.data
}


function Video() {

  const [file, setFile] = useState()
  const [videoFile, setVideoFile] = useState()
  const [description, setDescription] = useState("")
  const [videos, setVideos] = useState([])
  const [pptFiles, setPptFiles] = useState([])

  const submit = async event => {
    event.preventDefault()
    const resultPpt = await postVideoAndPpt({video: file, video2: videoFile})
    // const resultVideo = await postVideoAndPpt({video: videoFile, description})
    setVideos([resultPpt.video, ...videos])
    setPptFiles([resultPpt.videoFile, ...pptFiles])
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
    <div className="App">
      <form onSubmit={submit}>
        <label htmlFor="">ppt file</label>
        <input onChange={videoFileSelected} type="file" accept="video/*"></input>
        <br />
        <label htmlFor="">video file</label>
        <input onChange={fileSelected} type="file" accept="file/*"></input>
        <input value={description} onChange={e => setDescription(e.target.value)} type="text"></input>
        <button type="submit">Submit</button>
      </form>
      <video controls width="250">

        <source src="/videos/9ecf4cb95a62d929535aa452371cdf76" alt="" type="video/mp4"/>

      </video>
    </div>
  );
}

export default Video;