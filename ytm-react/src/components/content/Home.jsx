import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Content.css";
import Player from "../elements/Player";

const Home = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/metadata/playlists"
        );
        const playlistsData = response.data.playlists.map((playlist) => ({
          id: playlist.id,
          name: playlist.name,
        }));
        setPlaylists(playlistsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
        />
      </div>
      <div className="main-page">
        <h1>Playlists</h1>
        <ul>
          {playlists.map((playlist) => (
            <li key={playlist.id}>{playlist.name}</li>
          ))}
        </ul>
      </div>
      <div className="music-player-bar">
        <Player />
      </div>
    </div>
  );
};

export default Home;
