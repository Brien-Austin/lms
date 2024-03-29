import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import RegImage from "../assets/register.svg";
import Back from "../assets/backicon.svg";
import Google from "../assets/google.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addDoc, collection, getDocs, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase.config";
import { isLoggedIn } from "../store/features/auth/authSlice";
import { isAdminLoggedIn } from "../store/features/auth/adminSlice";
import { onAuthStateChanged } from "firebase/auth";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signUpData, setSignupData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adminData, setAdminData] = useState([]);
  useEffect(() => {
    const fetchSignupData = async () => {
      try {
        const signupCollection = collection(db, "Signup");
        const signupSnapshot = await getDocs(signupCollection);

        const signupDataArray = signupSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

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
    const foundUser = signUpData.find(
      (user) =>
        user.email === formData.email && user.password === formData.password
    );

    if (foundUser) {
      dispatch(isLoggedIn({ id: foundUser.id, name: foundUser.name }));
      setLoading(!loading);
      setTimeout(() => {
        navigate("/home");
      }, 3000);
      console.log("Sign-in successful! User ID:", foundUser.id);
    } else {
      console.error("Invalid email or password");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        console.log("User is signed in:", user.displayName);
        // You can redirect the user or perform other actions here.
      } else {
        // User is signed out.
        console.log("User is signed out");
      }
    });

    // Cleanup the subscription when the component unmounts.
    return () => unsubscribe();
  }, []);
  const handleAdminSignIn = () => {
    setLoading(true);
    const isValidAdmin = adminData.find(
      (user) =>
        user.email === formData.email && user.password === formData.password
    );

    if (isValidAdmin) {
      dispatch(
        isAdminLoggedIn({ id: isValidAdmin.id, name: isValidAdmin.name })
      );
      setTimeout(() => {
        navigate("/admin");
      }, 1000);
      console.log(isValidAdmin.name);
      console.log("Admin Sign-in successful!");
    } else {
      console.error("Invalid email or password");
    }
  };

  return (
    <>
      {loading && (
        <div>
          <div className="mx-8">
            <div className="mt-14 w-4/5 h-6 bg-slate-200 animate-pulse rounded-lg"></div>
            <div className="mt-1   w-2/5 h-6 bg-slate-200 animate-pulse rounded-lg"></div>
            <div className="mt-10   w-full h-10 bg-slate-200 animate-pulse rounded-lg"></div>
            <div className="flex gap-5 overflow-auto">
              <div className="mt-10   w-4/5 h-60  bg-slate-200 animate-pulse rounded-lg"></div>
              <div className="mt-10   w-1/5 h-60  bg-slate-200 animate-pulse rounded-lg"></div>
            </div>
            <div className="mt-8  w-3/5 h-6 bg-slate-200 animate-pulse rounded-lg"></div>
            <div className="flex justify-between">
              <div className="mt-4  w-4/5 h-6 bg-slate-200 animate-pulse rounded-lg"></div>
              <div className="mt-4  w-10 h-6 bg-slate-200 animate-pulse rounded-lg"></div>
            </div>
          </div>
          <div className="mt-8 fixed bottom-0 left-0 w-full h-20 bg-slate-200 animate-pulse rounded-lg"></div>
        </div>
      )}
      {!loading && (
        <div>
          <div className="flex-1 flex-col h-full mt-6 px-8">
            <Link to={"/signup"}>
              {" "}
              <div className="flex gap-2">
                <img src={Back} alt="" />
                <h1 className="text-md font-semibold">BACK</h1>
              </div>
            </Link>
            <div className="mt-4">
              <h1 className="text-2xl tracking-wide font-bold">
                Sign in to LMS
              </h1>
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
        </div>
      )}
    </>
  );
};

export default SignIn;
