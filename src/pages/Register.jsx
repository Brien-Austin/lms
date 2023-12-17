import React from "react";
import RegImage from "../assets/register.svg";
import Union from "../assets/union.svg";
import Index from "../assets/num.svg";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <>
      <div className="flex-1 flex-col h-full px-8">
        <img className="h-[24rem] w-full mt-6" src={RegImage} alt="" />
        <div className="flex flex-col text-xl leading-relaxed mt-4 font-semibold">
          <h1>
            <span className="text-indigo-600">Best Rated</span>
            <br /> Courses for you !
          </h1>
          <h1 className="mt-4 text-slate-400 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi,
            dignissimos!
          </h1>
        </div>
      </div>

      <div className="fixed cursor-pointer bottom-8 right-0 mx-10 flex">
        <Link to="/register">
          {" "}
          <div className="relative">
            <img src={Union} alt="" />{" "}
            <div className="absolute bottom-[25%] left-8">
              <Link to={"/signup"}>
                <h1 className="text-white text-md cursor-pointer">REGISTER</h1>
              </Link>
            </div>
            <div className="absolute bottom-[25%] cursor-pointer right-12">
              <Link to={"/signin"}>
                {" "}
                <h1 className="text-white text-md">LOGIN</h1>
              </Link>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Register;
