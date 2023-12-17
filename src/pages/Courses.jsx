import React from "react";
import { useSelector } from "react-redux";
import { coursesData } from "./dummy.data";
import { ShoppingBag, Heart, ChevronRight } from "lucide-react";
import NavBar from "../components/NavBar";

const Courses = () => {
  const currentCourseID = useSelector((state) => state.courseSelect.courseID);
  const filteredData = coursesData.filter(
    (course) => course.id === currentCourseID
  );

  const currentCourse = filteredData[0];
  const imageSrc = currentCourse.imageSrc;
  console.log(imageSrc);

  return (
    <>
      <NavBar />
      {filteredData.map((data, index) => (
        <div className="m-5 rounded">
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

            <button className="mx-5 text-white bg-black px-4 py-3 rounded">
              BUY NOW
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Courses;
