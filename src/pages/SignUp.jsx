import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, provider } from "../firebase.config";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addDoc, collection } from "firebase/firestore";
import { isGoogleAuthenticated } from "../store/features/auth/authSlice";
import RegImage from "../assets/register.svg";
import Back from "../assets/backicon.svg";
import Google from "../assets/google.svg";
import { isSignuped } from "../store/features/auth/signUpSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signupCollection = collection(db, "Signup");
  const [isloading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dateOfBirth: "",
    password: "",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    dateOfBirth: "",
    password: "",
    acceptTerms: "",
  });

  const handleGoogleSignIn = async () => {
    try {
      signInWithPopup(auth, provider).then((result) => {
        dispatch(
          isGoogleAuthenticated({
            id: auth.currentUser.uid,
            name: auth.currentUser.displayName,
          })
        );
        setIsLoading(true);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
        console.log("Logged in", auth.currentUser.displayName);
      });
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  const validateForm = () => {
    let valid = true;
    const updatedErrors = {
      name: "",
      email: "",
      dateOfBirth: "",
      password: "",
      acceptTerms: "",
    };

    // Validation for Name
    if (!formData.name.trim()) {
      updatedErrors.name = "Name is required";
      valid = false;
    }

    // Validation for Email Format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      updatedErrors.email = "Invalid email format";
      valid = false;
    }

    // Validation for Date of Birth (below 2006)
    const birthYear = new Date(formData.dateOfBirth).getFullYear();
    if (isNaN(birthYear) || birthYear >= 2006) {
      updatedErrors.dateOfBirth = "Date of Birth must be below 2006";
      valid = false;
    }

    // Validation for Password
    if (formData.password.length < 6) {
      updatedErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    // Validation for Accept Terms
    if (!formData.acceptTerms) {
      updatedErrors.acceptTerms = "Please accept Terms and Conditions";
      valid = false;
    }

    setErrors(updatedErrors);
    return valid;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        console.log("User is signed in:", user.uid);
        // You can redirect the user or perform other actions here.
      } else {
        // User is signed out.
        console.log("User is signed out");
      }
    });

    // Cleanup the subscription when the component unmounts.
    return () => unsubscribe();
  }, []);
  const handleSignUp = async () => {
    if (validateForm()) {
      try {
        const signupRef = await addDoc(collection(db, "Signup"), formData);
        dispatch(isSignuped(signupRef.id));

        console.log(`User created ${formData.name} with ID: ${signupRef.id}`);

        setTimeout(() => {
          navigate("/signin");
        }, 3000);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.error("error");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <>
      {isloading && (
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
      {!isloading && (
        <>
          <div className="flex-1 flex-col h-full mt-6 px-8">
            <Link to="/register">
              <div className="flex items-center gap-2">
                <img src={Back} alt="" />
                <h1 className="text-md font-semibold">BACK</h1>
              </div>
            </Link>
            <div className="mt-4">
              <h1 className="text-2xl tracking-wide font-bold">
                Complete Registration
              </h1>
            </div>
            <div className="mt-3">
              <h1 className="text-slate-500">Personal Information</h1>
            </div>{" "}
          </div>
          <div className="flex-1 flex-col h-full mt-6 px-8">
            {/* ... (existing code) */}

            <div className="mt-">
              <form action="">
                <input
                  type="text"
                  name="name"
                  className={`border w-full border-late-200 bg-slate-50 h-10 rounded-lg mt-1 px-4 outline-none ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>

                <input
                  type="text"
                  name="email"
                  className={`border w-full border-late-200 bg-slate-50 h-10 rounded-lg mt-4 px-4 outline-none ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                />
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>

                <input
                  type="date"
                  name="dateOfBirth"
                  className={`border w-full border-late-200 bg-slate-50 h-10 rounded-lg mt-4 px-4 outline-none ${
                    errors.dateOfBirth ? "border-red-500" : ""
                  }`}
                  placeholder="Select Date of Birth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />
                <p className="text-red-500 text-xs mt-1">
                  {errors.dateOfBirth}
                </p>

                <input
                  type="password"
                  name="password"
                  required
                  className={`border w-full border-late-200 bg-slate-50 h-10 rounded-lg mt-4 px-4 outline-none ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  placeholder="Set Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              </form>
              <div className="border w-full border-gray-300 mt-4"></div>
              <div className="mt-0 flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  className={`border border-late-200 bg-slate-50 h-4 w-4 rounded-lg mt-2 px-4 outline-none ${
                    errors.password ? "border-red-500 mb-8 " : ""
                  }`}
                  required
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                />
                <div className="flex flex-col items-center gap-1">
                  <h1 className="text-[10px] mt-4  text-slate-400">
                    By continuing, you accept our Terms and Conditions and
                    Privacy Policy
                  </h1>
                  <p className="text-red-500 text-xs mt-1">
                    {errors.acceptTerms}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 flex justify-center items-center mb-28 rounded-full border-2 border-slate-200 text-black bg-white p-3">
            <button onClick={handleGoogleSignIn} className="flex gap-2">
              <img src={Google} alt="" />
              Continue with Google
            </button>
          </div>

          <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 flex justify-center items-center mb-14 rounded-full bg-black text-white p-3">
            <button onClick={handleSignUp}>Continue</button>
          </div>
          <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 ">
            <h1 className="mb-4 text-sm text-slate-600">
              Already a user?{" "}
              <Link to="/signin">
                <span className="text-black font-semibold">Sign in</span>
              </Link>
            </h1>
          </div>
        </>
      )}
    </>
  );
};

export default SignUp;
