import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { coursesData } from "./dummy.data";
import { ShoppingBag, Heart, ChevronRight } from "lucide-react";
import NavBar from "../components/NavBar";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { Link } from "react-router-dom";

const Courses = () => {
  const [courseData, setCoursesData] = useState([]);
  const [paid, setPaid] = useState(false);
  const currentCourseID = useSelector((state) => state.courseSelect.courseID);
  const userID = useSelector((state) => state.authenticate.id);
  const userName = useSelector((state) => state.authenticate.name);

  console.log(currentCourseID);
  console.log(userID);
  const handleEnrollment = async (courseName) => {
    const userDataCollection = collection(db, "UserData");

    try {
      const userDataDocRef = doc(userDataCollection, userID);

      const userDataDoc = await getDoc(userDataDocRef);
      const userData = userDataDoc.exists() ? userDataDoc.data() : {};
      userData.name = userName;
      userData.id = userID;

      userData.enrolledCourses = userData.enrolledCourses || {};

      userData.enrolledCourses[currentCourseID] = {
        courseName: courseName,
        isPayed: false,
      };

      console.log("Updated userData:", userData);

      await setDoc(userDataDocRef, userData);

      console.log("Enrollment added successfully!");
    } catch (error) {
      console.error("Error adding enrollment: ", error);
    }
  };

  const filteredData = coursesData.filter(
    (course) => course.id === currentCourseID
  );
  const filteredCourseData = courseData.map((data) => {
    const enrolledCourses = data.enrolledCourses || {};
    const matchingCourse = enrolledCourses[currentCourseID];

    if (matchingCourse) {
      return {
        id: currentCourseID,
        isPayed: matchingCourse.isPayed,
        ...matchingCourse,
      };
    }

    return null;
  });

  console.log(filteredCourseData);

  const isAnyCoursePayed = filteredCourseData.some(
    (course) => course && course.isPayed
  );

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
  console.log(courseData);

  const currentCourse = filteredData[0];
  const imageSrc = currentCourse.imageSrc;

  return (
    <>
      <NavBar />
      {filteredData.map((data, index) => (
        <div key={index} className="m-5 rounded">
          <img
            className="rounded-lg"
            src={
              "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=600"
            }
            alt={`Course: ${currentCourse.name}`}
          />

          <div className="mt-10">
            <div className="flex justify-between items-center">
              <h1 className=" text-md font-semibold ">{data.name}</h1>

              <Heart className="font-thin h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-2 ">
              <h1 className="text-sm">{data.rating}</h1>
              <div className="border-slate-500 h-[0.5px] w-[0.5px] rounded-full border-2 "></div>
              <h1 className="text-sm text-indigo-700">
                {data.numberOfReviews} reviews
              </h1>
            </div>
            <div className="border mt-6 border-slate-200 w-full"></div>
            <h1 className="mt-6 font-semibold text-slate-700 tracking-wider">
              Description
            </h1>
            <h1 className="mt-3 text-sm text-slate-500">{data.description}</h1>
          </div>
          <div className="border mt-10 border-slate-200 w-full flex justify-center items-center flex-col"></div>
          <div className="flex justify-between cursor-not-allowed text-slate-700   font-semibold items-center mt-4">
            <h1>View Lectures</h1>
            <ChevronRight className="text-slate-700" />
          </div>
          <div className="border mt-4 border-slate-200 w-full "></div>
          <div className="flex justify-between cursor-not-allowed items-center mt-4 ">
            <h1 className="text-slate-700  text-md font-semibold cursor-not-allowed">
              View Lecture
            </h1>

            <ChevronRight className="text-slate-700" />
          </div>
          <div className="border mt-4 border-slate-200 w-full"></div>
          {!isAnyCoursePayed && (
            <div className="w-full   flex justify-between items-center h-20 bg-slate-100 rounded mb-24 mt-3">
              <div className="flex-col ">
                <h1 className="mx-5 font-md text-slate-800">Listed Price</h1>{" "}
                <div className="mx-5 flex gap-3 items-center">
                  <h1 className="font-bold">{data.price}</h1>
                  <h1 className="line-through text-slate-800 font-thin text-sm">
                    {data.price}
                  </h1>
                </div>
              </div>

              <button
                onClick={() => {
                  handleEnrollment(data.name);
                }}
                className="mx-5 text-white bg-black px-4 py-3 rounded"
              >
                BUY NOW
              </button>
            </div>
          )}

          {isAnyCoursePayed && (
            <Link to="/enrolledcourse">
              {" "}
              <div className="mb-24 flex justify-center items-center w-full ">
                {" "}
                <button className="mt-4 px-5  py-3 rounded w-full bg-gradient-to-r  from-indigo-700 to-indigo-800 text-white">
                  Continue Learning
                </button>
              </div>{" "}
            </Link>
          )}
        </div>
      ))}
    </>
  );
};

export default Courses;
