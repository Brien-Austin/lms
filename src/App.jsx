import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import OnBoard from "./pages/OnBoard";
import Register from "./pages/Register";
import UI from "./pages/UI";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/onboard" element={<OnBoard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<UI />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </>
  );
};

export default App;
