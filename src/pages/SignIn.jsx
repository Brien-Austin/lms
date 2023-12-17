import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import RegImage from "../assets/register.svg";
import Back from "../assets/backicon.svg";
import Google from "../assets/google.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addDoc, collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebase.config";
import { isAdminLoggedIn, isLoggedIn } from "../store/features/auth/authSlice";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signUpData, setSignupData] = useState([]);
  const [adminData, setAdminData] = useState([]);
  useEffect(() => {
    const fetchSignupData = async () => {
      try {
        const signupCollection = collection(db, "Signup");
        const signupSnapshot = await getDocs(signupCollection);
        const signupDataArray = signupSnapshot.docs.map((doc) => doc.data());
        console.log(signupDataArray);
        setSignupData(signupDataArray);
      } catch (error) {
        console.error("Error fetching SignUp data:", error.message);
      }
    };
    const fetchAdminData = async () => {
      try {
        const adminCollection = collection(db, "AdminUser");
        const adminSnapshot = await getDocs(adminCollection);
        const adminDataArray = adminSnapshot.docs.map((doc) => doc.data());
        console.log("Admin data", adminDataArray);
        setAdminData(adminDataArray);
      } catch (error) {
        console.error("Error fetching SignUp data:", error.message);
      }
    };
    fetchAdminData();

    fetchSignupData();
  }, []);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSignIn = () => {
    const isValidUser = signUpData.some(
      (user) =>
        user.email === formData.email && user.password === formData.password
    );

    if (isValidUser) {
      dispatch(isLoggedIn(signUpData.id));
      setTimeout(() => {
        navigate("/home");
      }, 3000);
      console.log("Sign-in successful!");
    } else {
      console.error("Invalid email or password");
    }
  };

  const handleAdminSignIn = () => {
    const isValidAdmin = adminData.some(
      (user) =>
        user.email === formData.email && user.password === formData.password
    );

    if (isValidAdmin) {
      dispatch(isAdminLoggedIn(adminData.id));
      setTimeout(() => {
        navigate("/admin");
      }, 3000);
      console.log("Admin Sign-in successful!");
    } else {
      console.error("Invalid email or password");
    }
  };

  return (
    <>
      <div className="flex-1 flex-col h-full mt-6 px-8">
        <Link to={"/signup"}>
          {" "}
          <div className="flex gap-2">
            <img src={Back} alt="" />
            <h1 className="text-md font-semibold">BACK</h1>
          </div>
        </Link>
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
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border w-full border-late-200 bg-slate-50 h-10 rounded-lg mt-4 px-4 outline-none"
              placeholder="Email Address"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border w-full border-late-200 bg-slate-50 h-10 rounded-lg mt-4 px-4 outline-none"
              placeholder="Password"
            />
          </form>
        </div>
      </div>
      <div className="fixed bottom-0 mb-28 left-1/2 transform -translate-x-1/2 w-4/5 flex justify-center items-center  rounded-full bg-black text-white p-3">
        <button onClick={handleAdminSignIn}>Admin Login</button>
      </div>

      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 flex justify-center items-center mb-14 rounded-full bg-black text-white p-3">
        <button onClick={handleSignIn}>Continue</button>
      </div>
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 ">
        <h1 className="mb-4 whitespace-nowrap text-sm text-slate-600">
          Dont have an account ?{" "}
          <Link to={"/signup"}>
            <span className="text-black font-semibold">Signup</span>
          </Link>
        </h1>
      </div>
    </>
  );
};

export default SignIn;
