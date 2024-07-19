import React from "react";
import { useParams } from "react-router-dom";
function Album() {
  const { albumId } = useParams();
  return <div>{albumId}</div>;
}

export default Album;
