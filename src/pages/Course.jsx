import React from "react";
import NavBar from "../components/NavBar";
import { coursesData } from "./dummy.data";
import { useDispatch } from "react-redux";
import { currentCourse } from "../store/features/course/courseSlice";
import { Link } from "react-router-dom";

const Course = () => {
  const dispatch = useDispatch();
  const handleCurrentCourse = (id) => {
    dispatch(currentCourse(id));
  };
  return (
    <>
      <NavBar />
      <div className="m-8">
        <h1 className="text-2xl font-semibold"> Courses to UpSkill</h1>
        <div className="flex flex-col mt-10 gap-10">
          {coursesData.map((data, index) => (
            <div
              style={{ borderRadius: "10px 10px 10px 10px" }}
              className="border  rounded border-slate-200 shadow-xsm"
              key={index}
            >
              <img
                style={{ borderRadius: "10px 10px 0px 0px" }}
                className="w-full h-48 object-cover"
                src="https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
              />
              <div className="mt-3 px-4">
                <div className="flex justify-between items-center">
                  <p className="text-xl font-md w-18">{data.name}</p>
                  <p className="font-semibold text-xl">{data.price}</p>
                </div>

                <p className="mt-4 text-sm text-gray-800">{data.description}</p>
                <Link to="/course">
                  {" "}
                  <button
                    onClick={() => handleCurrentCourse(data.id)}
                    className="w-full py-3 mt-3 mb-3 rounded text-white font-md bg-indigo-700"
                  >
                    Enroll Now !
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Course;
