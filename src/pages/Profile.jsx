import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useSelector } from "react-redux";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase.config";
import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const Profile = ({ isLoggedIn }) => {
  const userName = useSelector((state) => state.authenticate.name);
  const userID = useSelector((state) => state.authenticate.id);
  const [coursesData, setCoursesData] = useState([]);
  const userCourses = coursesData.filter((courses) => courses.id === userID);
  console.log(coursesData);
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/signin");
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signin");
    }
    const unsubscribe = onSnapshot(collection(db, "UserData"), (snapshot) => {
      const Courses = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCoursesData(Courses);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className="m-10">
        <div className="flex flex-col justify-between ietms-center">
          <h1 className="text-xl">
            Hey <span className="font-semibold">{userName}</span>
          </h1>
          <button
            onClick={() => handleLogout()}
            className="bg-slate-50 w-fit mt-4 px-3 py-1  flex items-center gap-1 rounded font-semibold"
          >
            <LogOut /> Logout
          </button>
        </div>
      </div>
      <div className="">
        <h1 className="m-10 text-xl">Enrolled Courses</h1>
        <div>
          {coursesData.map((data, index) => (
            <div
              className="mt-10  mx-10 flex flex-col gap-10 mb-24"
              key={index}
            >
              {data &&
                data.enrolledCourses &&
                Object.entries(data.enrolledCourses).map(
                  ([key, course]) =>
                    course.isPayed && (
                      <div
                        key={key}
                        className="border p-5 rounded-lg border-slate-400"
                      >
                        <h1>{course.courseName}</h1>
                        <Link to="/enrolledcourse">
                          <div className="w-full">
                            <button className="mt-5 px-3 bg-gradient-to-r from-indigo-700 to-indigo-800 rounded-md text-white py-3 w-full">
                              Continue Learning
                            </button>
                          </div>
                        </Link>
                      </div>
                    )
                )}
            </div>
          ))}
        </div>
      </div>
      <NavBar />
    </>
  );
};

export default Profile;
