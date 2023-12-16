import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth, provider } from "../firebase.config"; // Import the auth and provider from your firebase.js file
import RegImage from "../assets/register.svg";
import Back from "../assets/backicon.svg";
import Google from "../assets/google.svg";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { isAuthenticated } from "../store/features/auth/authSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleSignIn = async () => {
    try {
      signInWithPopup(auth, provider).then((result) => {});
      dispatch(isAuthenticated(auth.currentUser.uid));
      console.log("Logged in", auth.currentUser.uid);
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  const handleSignUp = async () => {
    try {
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  };

  return (
    <>
      <div className="flex-1 flex-col h-full mt-6 px-8">
        <div className="flex gap-2">
          <img src={Back} alt="" />
          <h1 className="text-md font-semibold">BACK</h1>
        </div>
        <div className="mt-4">
          <h1 className="text-2xl tracking-wide font-bold">
            Complete Registration
          </h1>
        </div>
        <div className="mt-4">
          <h1 className="text-slate-500">Personal Information</h1>
        </div>
        <div className="mt-2">
          <form action="">
            <input
              type="text"
              className="border w-full border-late-200 bg-slate-50 h-10 rounded-lg mt-4 px-4 outline-none"
              placeholder="Name"
            />
            <input
              type="text"
              className="border w-full border-late-200 bg-slate-50 h-10 rounded-lg mt-4 px-4 outline-none"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              className="border w-full border-late-200 bg-slate-50 h-10 rounded-lg mt-4 px-4 outline-none"
              placeholder="Select Date of Birth"
            />
            <input
              type="text"
              required
              className="border w-full border-late-200 bg-slate-50 h-10 rounded-lg mt-4 px-4 outline-none"
              placeholder="Set Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </form>
          <div className="border w-full border-gray-300 mt-8"></div>
          <div className="mt-6 flex gap-2 items-center">
            <input type="checkbox" className="h-8 w-8" />
            <h1 className="text-sm text-slate-400">
              By continuing, you accept to our Terms and Conditions and Privacy
              Policy
            </h1>
          </div>
        </div>
      </div>
      <div className="fixed   bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 flex justify-center items-center mb-28 rounded-full border-2 border-slate-200 text-black bg-white  p-3">
        <button onClick={handleGoogleSignIn} className="flex gap-2">
          {" "}
          <img src={Google} alt="" />
          Continue with Google
        </button>
      </div>

      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 flex justify-center items-center mb-14 rounded-full bg-black text-white p-3">
        <button onClick={handleSignUp}>Continue</button>
      </div>
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 ">
        <h1 className="mb-4 text-sm text-slate-600">
          Already a user ?{" "}
          <span className="text-black font-semibold">Sign in</span>
        </h1>
      </div>
    </>
  );
};

export default SignUp;
