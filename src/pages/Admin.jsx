import React, { useEffect, useState } from "react";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";
import NavBar from "../components/NavBar";
import { db } from "../firebase.config";
import { coursesData } from "./dummy.data";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const isAdmin = useSelector((state) => state.admin.isLoggedIn);
  console.log(isAdmin);
  const [userData, setAdminData] = useState([]);
  useEffect(() => {
    if (!isAdmin) {
      navigate("/signin");
    }
  }, []);
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "UserData"), (snapshot) => {
      const updatedUserData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(updatedUserData);
      setAdminData(updatedUserData);
    });

    return () => unsubscribe();
  }, []);

  const handleGiveAccess = async (userId, courseId) => {
    try {
      const userDocRef = doc(collection(db, "UserData"), userId);

      await updateDoc(userDocRef, {
        [`enrolledCourses.${courseId}.isPayed`]: true,
      });

      console.log("Access granted successfully!");
    } catch (error) {
      console.error("Error granting access: ", error);
    }
  };

  return (
    <>
      <h1 className="mx-14 mt-10 text-2xl font-semibold">
        Course Access Requests
      </h1>
      <div className="flex flex-col gap-10 mx-10 mt-5 mb-24">
        {userData.map((data) => (
          <div className="border p-5 rounded-lg shadow-md" key={data.id}>
            <h2 className="whitespace-nowrap w-fit truncate bg-slate-100 px-2 py-1 rounded">
              <span className="text-xl font-semibold">{data.name}</span>
            </h2>

            <ul>
              {Object.entries(data.enrolledCourses).map(
                ([courseId, course]) => {
                  const foundCourse = coursesData.find(
                    (courseData) => courseData.id.toString() === courseId
                  );

                  if (!course.isPayed) {
                    return (
                      <li className="mt-4" key={courseId}>
                        <h1>
                          {" "}
                          Course Name: {foundCourse ? foundCourse.name : "N/A"},
                        </h1>
                        <button
                          onClick={() => handleGiveAccess(data.id, courseId)}
                          className="rounded bg-indigo-700 text-white px-3 py-2 mt-2"
                        >
                          Give Access
                        </button>
                      </li>
                    );
                  }

                  return null;
                }
              )}
            </ul>
          </div>
        ))}
      </div>
      <NavBar />
    </>
  );
};

export default Admin;
