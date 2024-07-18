import React from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const Navigate = useNavigate();
  return (
    <div>
      <h1>Success</h1>
      <button onClick={() => Navigate("/about")}>Go to About</button>
    </div>
  );
};

export default Home;
