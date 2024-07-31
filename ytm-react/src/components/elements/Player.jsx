import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "../content/Content.css";

function Player() {
  const [trackId, setTrackId] = useState("2277cc1fd395db6b"); // Initial track ID
  const [audioSrc, setAudioSrc] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1); // Default volume is 100%
  const audioRef = useRef(null);

  useEffect(() => {
    // Fetch the MP3 file when the trackId changes
    const fetchTrack = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/testStream?trackid=${trackId}`,
          {
            responseType: "blob",
          }
        );
        const url = URL.createObjectURL(response.data);
        setAudioSrc(url);
      } catch (error) {
        console.error("Error fetching track:", error);
      }
    };

    fetchTrack();
  }, [trackId]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const current = audioRef.current.currentTime;
    setProgress((current / duration) * 100);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleProgressChange = (event) => {
    const newProgress = event.target.value;
    audioRef.current.currentTime =
      (newProgress / 100) * audioRef.current.duration;
    setProgress(newProgress);
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const nextTrack = () => {
    // Implement the logic to get the next track id
    setTrackId("nextTrackId"); // Replace with actual logic to get next track ID
  };

  const previousTrack = () => {
    // Implement the logic to get the previous track id
    setTrackId("previousTrackId"); // Replace with actual logic to get previous track ID
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="player-container">
      <img
        src="./src/assets/slaythespire.jpg"
        alt="Album Image"
        className="album-image"
      />
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
      <div className="controls">
        <button onClick={previousTrack} className="control-button">
          Previous
        </button>
        <button onClick={togglePlayPause} className="control-button">
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button onClick={nextTrack} className="control-button">
          Next
        </button>
      </div>
      <div className="progress-container">
        <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
        <input
          type="range"
          value={progress}
          onChange={handleProgressChange}
          min="0"
          max="100"
          className="progress-bar"
        />
        <span>{formatTime(duration)}</span>
      </div>
      <div className="volume-container">
        <label htmlFor="volume">Volume: </label>
        <input
          type="range"
          id="volume"
          value={volume}
          onChange={handleVolumeChange}
          min="0"
          max="1"
          step="0.01"
          className="volume-bar"
        />
      </div>
    </div>
  );
}

export default Player;
