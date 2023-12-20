import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import OnBoard from "./pages/OnBoard";
import Register from "./pages/Register";
import UI from "./pages/UI";

import SignIn from "./pages/SignIn";
import Admin from "./pages/Admin";
import Courses from "./pages/Courses";
import { useSelector } from "react-redux";
import Notes from "./pages/Notes";
import Profile from "./pages/Profile";
import Course from "./pages/Course";

import SignUp from "./pages/SignUp";
import Enrolled from "./pages/Enrolled";

const Error = () => {
  return (
    <>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-xl font-semibold">Error ! Page not found</h1>
        <h1 className="text-sm text-slate-700">or we might me updating</h1>
      </div>
    </>
  );
};

const App = () => {
  const isLoggedIn = useSelector((state) => state.authenticate.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <>
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="/onboard" element={<OnBoard isLoggedIn={isLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<UI isLoggedIn={isLoggedIn} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/admin" element={<Admin isLoggedIn={isLoggedIn} />} />
        <Route path="/course" element={<Courses isLoggedIn={isLoggedIn} />} />
        <Route path="/courses" element={<Course isLoggedIn={isLoggedIn} />} />
        <Route path="/notes" element={<Notes isLoggedIn={isLoggedIn} />} />
        <Route path="/profile" element={<Profile isLoggedIn={isLoggedIn} />} />
        <Route
          path="/enrolledcourse"
          element={<Enrolled isLoggedIn={isLoggedIn} />}
        />
      </Routes>
    </>
  );
};

export default App;
