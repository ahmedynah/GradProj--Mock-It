import { useState } from 'react'
import axios from 'axios'


async function postVideo({video, description}) {
  const formData = new FormData();
  formData.append("video", video)
  formData.append("description", description)

  
  const result = await axios.post('http://localhost:5000/videos', formData, { headers: {'Content-Type': 'multipart/form-data'}})
  .catch(function (error) {
    console.log(error);
  });
  console.log(result.data);
  return result.data
}


function Video() {

  const [file, setFile] = useState()
  const [description, setDescription] = useState("")
  const [videos, setVideos] = useState([])

  const submit = async event => {
    event.preventDefault()
    const result = await postVideo({video: file, description})
    setVideos([result.video, ...videos])
  }

  const fileSelected = event => {
    const file = event.target.files[0]
		setFile(file)
	}

  return (
    <div className="App">
      <form onSubmit={submit}>
        <input onChange={fileSelected} type="file" accept="video/*"></input>
        <input value={description} onChange={e => setDescription(e.target.value)} type="text"></input>
        <button type="submit">Submit</button>
      </form>
      <video controls width="250">

        <source src="/videos/dd4cac0bd11c54139eedd4bffa785692" alt="" type="video/mp4"/>

      </video>
    </div>
  );
}

export default Video;