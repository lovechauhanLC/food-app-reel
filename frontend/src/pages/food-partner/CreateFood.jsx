import React, { useEffect, useMemo, useRef, useState } from "react";
import videoIcon from "../../assets/video.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateFood = () => {
  const fileInputRef = useRef(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState("");
  const [fileError, setFileError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!videoFile) {
      setVideoURL("");
      return;
    }

    const url = URL.createObjectURL(videoFile);
    setVideoURL(url);
    return () => URL.revokeObjectURL(url);
  }, [videoFile]);

  const onFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) {
      setVideoFile(null);
      setFileError("");
      return;
    }

    if (!file.type.startsWith("video/")) {
      setFileError("Please select a valid video file");
      return;
    }

    setFileError("");
    setVideoFile(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer?.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("video/")) {
      setFileError("Please drop a valid video file.");
      return;
    }

    setFileError("");
    setVideoFile(file);
  };

  const onDragOver = (e) => e.preventDefault();

  const openFileDialog = () => fileInputRef.current?.click();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("video", videoFile);

    const response = await axios.post(
      "http://localhost:3000/api/food",
      formData,
      {
        withCredentials: true,
      }
    );

    console.log(response);

    navigate("/");
  };

  const isDisabled = useMemo(
    () => !name.trim() || !videoFile,
    [name, videoFile]
  );

  return (
    <div className="bg-gray-100 min-h-screen px-4 py-6 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 w-full max-w-xl">
        <header className="mb-6">
          <h1 className="text-2xl text-center sm:text-3xl font-bold text-gray-800">
            Create Food
          </h1>
          <p className="text-gray-600 mt-1">
            Upload a short video, give it a name, and add a description
          </p>
        </header>

        <form onSubmit={onSubmit}>
          <div className="mb-6">
            <label
              htmlFor="foodVideo"
              className="block text-gray-700 font-medium mb-1 text-sm sm:text-base"
            >
              Food Video
            </label>
            <input
              id="foodVideo"
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={onFileChange}
              className="hidden"
            />

            <div
              role="button"
              tabIndex={0}
              onClick={openFileDialog}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openFileDialog();
                }
              }}
              onDrop={onDrop}
              onDragOver={onDragOver}
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 cursor-pointer transition"
            >
              <img
                width="32"
                height="32"
                src={videoIcon}
                alt="Upload icon"
                className="mx-auto mb-2"
              />
              <div className="file-dropzone-text text-gray-700">
                <strong>Tap to upload</strong> or drag and drop
              </div>
              <div className="file-hint text-gray-500 text-sm mt-1">
                MP4, WebM, MOV • Up to ~100MB
              </div>
            </div>

            {fileError && (
              <p role="alert" className="text-red-600 mt-2 text-sm">
                {fileError}
              </p>
            )}

            {videoFile && (
              <div className="mt-4 flex items-center space-x-4 text-gray-700 text-sm">
                <img
                  width="32"
                  height="32"
                  src={videoIcon}
                  alt="Video file icon"
                />
                <div className="flex-1">
                  <div className="font-medium">{videoFile.name}</div>
                  <div>{(videoFile.size / 1024 / 1024).toFixed(1)} MB</div>
                </div>
                <div className="flex flex-wrap space-x-2 space-y-2">
                  <button
                    type="button"
                    onClick={openFileDialog}
                    className="bg-blue-600 text-white font-semibold rounded-lg py-1.5 px-3 hover:bg-blue-700 transition active:scale-95"
                  >
                    Change
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setVideoFile(null);
                      setFileError("");
                    }}
                    className="bg-red-600 text-white font-semibold rounded-lg py-1.5 px-3 hover:bg-red-700 transition active:scale-95"
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
                className="rounded-lg shadow-md w-full mt-4"
              />
            </div>
          )}

          <div className="mb-6">
            <label
              htmlFor="foodName"
              className="block text-gray-700 font-medium mb-1 text-sm sm:text-base"
            >
              Name
            </label>
            <input
              type="text"
              name="foodName"
              id="foodName"
              placeholder="e.g. Pizza"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="foodDesc"
              className="block text-gray-700 font-medium mb-1 text-sm sm:text-base"
            >
              Food Description
            </label>
            <textarea
              id="foodDesc"
              rows={4}
              placeholder="Write a short description: ingredients, taste, spice level, etc."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base resize-none"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isDisabled}
              className="bg-blue-600 text-white font-semibold rounded-lg py-2.5 w-full hover:bg-blue-700 transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Food
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFood;
