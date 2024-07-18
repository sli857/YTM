import React from "react";
import "./Home.css";
const Home = () => {
  const audioUrl = "http://localhost:3000/stream?trackid=3977a7f7bcad66f9";

  return (
    <div className="page">
      <div className="navigation-bar">
        <div className="navi-button-container">
          <button className="nav-button">Explore</button>
          <button className="nav-button">Library</button>
        </div>
        <img
          src="./src/assets/slaythespire.jpg"
          className="user-icon"
          onClick={() => {}}
        ></img>{" "}
      </div>
      <div className="music-player-bar">
        <audio id="streamAudio" src={audioUrl} controls />
      </div>
    </div>
  );
};

export default Home;
