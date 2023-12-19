import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useSelector } from "react-redux";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase.config";
import { Link } from "react-router-dom";

const Profile = () => {
  const userName = useSelector((state) => state.authenticate.name);
  const userID = useSelector((state) => state.authenticate.id);
  const [coursesData, setCoursesData] = useState([]);
  const userCourses = coursesData.filter((courses) => courses.id === userID);
  console.log(userCourses);

  useEffect(() => {
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
        <h1 className="text-xl">
          Hey <span className="font-semibold">{userName}</span>
        </h1>
      </div>
      <div className="">
        <h1 className="m-10 text-xl">Enrolled Courses</h1>
        <div>
          {userCourses.map((data, index) => (
            <div
              className="mt-10  mx-10 flex flex-col gap-10 mb-24"
              key={index}
            >
              {Object.entries(data.enrolledCourses).map(([key, course]) => (
                <div className="border p-5 rounded-lg border-slate-400">
                  <h1 key={key}>{course.courseName}</h1>
                  <div className="flex justify-center items-center">
                    <Link to="/enrolledcourse">
                      {" "}
                      <button className=" mt-5 px-3 bg-gradient-to-r from-indigo-700 to-indigo-800 rounded-md text-white py-3 w-full">
                        Continue Learning
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <NavBar />
    </>
  );
};

export default Profile;
