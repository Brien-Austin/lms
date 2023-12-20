import React from "react";
import HomeImage from "../assets/homeui.svg";
import Next from "../assets/next.svg";
import Index from "../assets/num.svg";
import { Link } from "react-router-dom";

const Home = ({}) => {
  return (
    <>
      <div className="flex-1 flex-col h-full px-8">
        <img className="h-[24rem] w-full mt-6" src={HomeImage} alt="" />
        <div className="flex flex-col text-xl leading-relaxed mt-4 font-semibold">
          <h1>
            {" "}
            Extremely <span className="text-indigo-600">easy</span> <br />
            to use interface
          </h1>
          <h1 className="mt-4 text-slate-400 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi,
            dignissimos!
          </h1>
        </div>
      </div>
      <div className="fixed bottom-14 left-0 mx-10 flex">
        <img src={Index} alt="" />
      </div>
      <div className="fixed cursor-pointer bottom-8 right-0 mx-10 flex">
        <Link to="/onboard">
          {" "}
          <img src={Next} alt="" />{" "}
        </Link>
      </div>
    </>
  );
};

export default Home;
