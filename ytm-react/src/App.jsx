import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Loginform from "./components/authorization/Loginform.jsx";
import YtmApp from "./components/structural/YtmApp.jsx";

const App = () => {
  const [isAuthorized, setIsAuthorized] = useState(
    localStorage.getItem("isAuthorized") === "true"
  );
  useEffect(() => {
    localStorage.setItem("isAuthorized", isAuthorized);
  }, [isAuthorized]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<Loginform setAuth={setIsAuthorized} />}
        />
        <Route
          path="/*"
          element={isAuthorized ? <YtmApp /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
