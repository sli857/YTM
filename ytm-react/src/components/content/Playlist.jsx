import React from "react";
import { useParams } from "react-router-dom";
function Playlist() {
  const { playlistId } = useParams();
  return <div>{playlistId}</div>;
}

export default Playlist;
