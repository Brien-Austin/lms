import React from "react";
import { Link } from "react-router-dom";
import { Home, StickyNote, BookOpen, CircleUserRound } from "lucide-react";

const NavBar = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-indigo-700 text-white">
      <div className="flex justify-around p-4">
        <Link to="/home" className="flex flex-col gap-1  items-center">
          <Home />
          <h1 className="text-sm">Home</h1>
        </Link>
        <Link to="/courses" className="flex flex-col gap-1  items-center">
          <BookOpen />
          <h1 className="text-sm">Courses</h1>
        </Link>
        <Link to="/notes" className="flex flex-col gap-1  items-center">
          <StickyNote />
          <h1 className="text-sm">Notes</h1>
        </Link>
        <Link to="/profile" className="flex flex-col gap-1  items-center">
          <CircleUserRound />
          <h1 className="text-sm">Profile</h1>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
