import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import OnBoard from "./pages/OnBoard";
import Register from "./pages/Register";
import UI from "./pages/UI";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Admin from "./pages/Admin";
import Courses from "./pages/Courses";
import { useSelector } from "react-redux";
import Notes from "./pages/Notes";
import Profile from "./pages/Profile";
import Course from "./pages/Course";

const App = () => {
  const isLoggedIn = useSelector((state) => state.authenticate.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/onboard" element={<OnBoard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<UI isLoggedIn={isLoggedIn} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/course" element={<Courses />} />
        <Route path="/courses" element={<Course />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default App;
