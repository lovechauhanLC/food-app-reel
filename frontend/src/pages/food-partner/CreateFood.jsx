import React, {useEffect, useMemo, useRef, useState } from "react";
import videoIcon from '../../assets/video.svg'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateFood = () => {
  const fileInputRef = useRef(null);
  const[name,setName] = useState('')
  const[description,setDescription] = useState('')
  const[videoFile,setVideoFile] = useState(null)
  const[videoURL,setVideoURL] = useState('')
  const[fileError,setFileError] = useState('')

  const navigate = useNavigate()

  useEffect(()=>{
    if(!videoFile){
      setVideoURL("")
      return
    }

    const url = URL.createObjectURL(videoFile)
    setVideoURL(url)
    return () => URL.revokeObjectURL(url)
  },[videoFile])

  const onFileChange = (e) => {
    const file = e.target.files && e.target.files[0]
    if(!file){
      setVideoFile(null)
      setFileError("")
      return
    }

    if(!file.type.startWith("video/")){
      setFileError("Please select a valid video file")
      return
    }

    setFileError("")
    setVideoFile(file)
  }

  const onDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const file = e.dataTransfer?.files?.[0]

    if(!file) return

    if(!file.type.startWith("video/")){
       setFileError("Please drop a valid video file.");
      return;
    }

    setFileError("")
    setVideoFile(file)
  }

  const onDragOver = (e) => e.preventDefault()

  const openFileDialog = () => fileInputRef.current?.click()

  const onSubmit = async (e) => {
    e.preventDefault()

    const fromFata = new FormData()

    FormData.append("name",name)
    FormData.append("description",description)
    FormData.append("video",videoFile)

    const response = await axios.post("http://localhost:3000/api/food",FormData,{
      withCredentials: true
    })

    console.log(response)

    navigate("/")
    
  }

  const isDisabled = useMemo(
    () => !name.trim() || !videoFile,
    [name,videoFile]
  )

  return (
    <div>
      <div>

        <header>
          <h1>Create Food</h1>
          <p>Upload a short video, give it a name, and add a description</p>
        </header>

        <form onSubmit={onSubmit}>

          <div>
            <label htmlFor="foodVideo">Food Video</label>
            <input
              id="foodVideo"
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={onFileChange}
            />

            <div
              role="button"
              onClick={openFileDialog}
              onKeyDown={(e)=>{
                if(e.key === 'Enter' || e.key === " "){
                  e.preventDefault()
                  openFileDialog()
                }
              }}
              onDrop={onDrop}
              onDragOver={onDragOver}
            >
              <img
                width="32"
                height="32"
                src={videoIcon}
              />
              <div className="file-dropzone-text">
                <strong>Tap to upload</strong> or drag and drop
              </div>
              <div className="file-hint">MP4, WebM, MOV • Up to ~100MB
              </div>
            </div>

            {fileError &&
              (<p role="alert">{fileError}</p>)}

              {videoFile && (
                <div>
                <img
                width="32"
                height="32"
                src={videoIcon}
                />
                <span>{videoFile.name}</span>
                <span >
                  {(videoFile.size / 1024 / 1024).toFixed(1)} MB
                </span>
                <div >
                  <button
                    type="button"
                    onClick={openFileDialog}
                  >
                    Change
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setVideoFile(null);
                      setFileError("");
                    }}
                  >
                    Remove
                  </button>
                </div>
                </div>
              )}
          </div>

          {videoURL && (
            <div>
            <video
              src={videoURL}
              controls
              playsInline
              preload="metadata"
            />
            </div>
          )}

          <div>
          <label htmlFor="foodName">Name</label>
          <input 
          type="text"
           name="foodName" 
           id="foodName" 
           placeholder="e.g. Pizza"
           value={name}
           onChange={(e)=> setName(e.target.value)}
           required
           />
          </div>

          <div>
          <label htmlFor="foodDesc">Food Description</label>
          <textarea 
          id="foodDesc"
          rows={4}
          placeholder="Write a short description: ingredients, taste, spice level, etc."
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
          />
          </div>

          <div>
          <button type="submit" disabled={isDisabled}>
          Save Food
          </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default CreateFood;
