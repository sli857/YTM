import React from "react";
import { Routes, Route } from "react-router-dom";

// Import your components here
import Home from "../content/Home.jsx";
import About from "../content/About.jsx";

function YtmApp() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default YtmApp;
