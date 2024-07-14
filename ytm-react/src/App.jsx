import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Loginform from "./components/authorization/Loginform.jsx";
const App = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<Loginform setAuth={setIsAuthorized} />}
        />
        <Route
          path="/*"
          element={
            isAuthorized ? (
              <div>
                <h1>success</h1>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
