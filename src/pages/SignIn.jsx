import React from "react";
import RegImage from "../assets/register.svg";
import Back from "../assets/backicon.svg";
import Google from "../assets/google.svg";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <>
      <div className="flex-1 flex-col h-full mt-6 px-8">
        <div className="flex gap-2">
          <img src={Back} alt="" />
          <h1 className="text-md font-semibold">BACK</h1>
        </div>
        <div className="mt-4">
          <h1 className="text-2xl tracking-wide font-bold">Sign in to LMS</h1>
        </div>
        <div className="mt-4">
          <h1 className="text-slate-500">Personal Information</h1>
        </div>
        <div className="mt-2">
          <form action="">
            <input
              type="text"
              className="border w-full border-late-200 bg-slate-50 h-10 rounded-lg mt-4 px-4 outline-none"
              placeholder="Email Address"
            />
            <input
              type="password"
              className="border w-full border-late-200 bg-slate-50 h-10 rounded-lg mt-4 px-4 outline-none"
              placeholder="Password"
            />
          </form>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 flex justify-center items-center mb-14 rounded-full bg-black text-white p-3">
        <Link to="/home">Continue</Link>
      </div>
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 ">
        <h1 className="mb-4 whitespace-nowrap text-sm text-slate-600">
          Dont have an account ?{" "}
          <span className="text-black font-semibold">Signup</span>
        </h1>
      </div>
    </>
  );
};

export default SignIn;
