import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-indigo-700 text-white">
      <div className="flex justify-around p-4">
        <Link to="/" className="flex items-center">
          Home
        </Link>
        <Link to="/dashboard" className="flex items-center">
          Admin
        </Link>
        <Link to="/profile" className="flex items-center">
          Profile
        </Link>
        <Link to="/profile" className="flex items-center">
          Courses
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
