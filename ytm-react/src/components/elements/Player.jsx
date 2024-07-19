import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "../content/Content.css";

function Player() {
  const [trackId, setTrackId] = useState("2277cc1fd395db6b"); // You can set your initial track id here
  const [audioSrc, setAudioSrc] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    // Fetch the MP3 file when the trackId changes
    const fetchTrack = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/stream/${trackId}`,
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
    const duration = audioRef.current.duration;
    setProgress((current / duration) * 100);
  };

  const handleProgressChange = (event) => {
    const newProgress = event.target.value;
    audioRef.current.currentTime =
      (newProgress / 100) * audioRef.current.duration;
    setProgress(newProgress);
  };

  const nextTrack = () => {
    // Implement the logic to get the next track id
  };

  const previousTrack = () => {
    // Implement the logic to get the previous track id
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
        onEnded={() => setIsPlaying(false)}
      />
      <div className="controls">
        <button onClick={previousTrack}>Previous</button>
        <button onClick={togglePlayPause}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button onClick={nextTrack}>Next</button>
      </div>
      <input
        type="range"
        value={progress}
        onChange={handleProgressChange}
        min="0"
        max="100"
        className="progress-bar"
      />
    </div>
  );
}

export default Player;
