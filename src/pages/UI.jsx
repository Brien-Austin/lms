import React from "react";
import NavBar from "../components/NavBar";
import { coursesData, notesData } from "./dummy.data";
import Image from "../assets/course.jpg";

const UI = () => {
  return (
    <>
      <NavBar />
      <div className="mx-8">
        <h1 className="mt-8 font-semibold tracking-wider">
          Find College/School <br />
          courses at one place
        </h1>
        <div className="mt-8 flex">
          <div
            className="border w-full bg-slate-50 h-10 rounded overflow-hidden"
            style={{ borderRadius: "10px 0px 0px 10px" }}
          >
            <input
              style={{ borderRadius: "10px 0px 0px 10px" }}
              placeholder="Search courses"
              className="outline-none bg-slate-50 px-3 w-full h-10"
              type="text"
            />
          </div>
          <button
            className="bg-indigo-600 text-white px-3 py-1"
            style={{ borderRadius: "0px 5px 5px 0px" }}
          >
            Search
          </button>
        </div>
        <div className="mt-8 overflow-x-auto flex gap-5 overflow-y-auto snap-container ">
          {coursesData.map((data, index) => (
            <div
              className="border border-slate-200 w-4/5 h-72 snap rounded"
              style={{ borderRadius: "10px 10px 10px 10px" }}
              key={index}
            >
              <img
                src={Image}
                style={{ borderRadius: "10px 10px 0px 0px" }}
                alt={data.name}
                className="w-full h-3/5 object-cover p-1"
              />
              <div className=" bg-slate-100 rounded w-fit mx-3">
                <h1 className="text-sm  px-2 py-1 font-bold">{data.rating}</h1>
              </div>
              <div className="mt-4 mx-3">
                <h1 className="text-sm font-bold truncate">{data.name}</h1>
              </div>
              <div className="mt-2 px-3">
                <h1 className=" text-sm text-indigo-600">
                  {data.percentCompleted}% completed
                </h1>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <h1 className="font-bold text-xl">Downloaded Notes</h1>
          <div className="flex justify-between items-center">
            <h1 className=" text-sm text-slate-400 mt-2 truncat mr-10">
              Lorem ipsum dolor sit amet consectetur adipisicing
            </h1>
            <h1 className="text-sm whitespace-nowrap text-indigo-700">
              View all
            </h1>
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-4 mb-24">
          {notesData.slice(0, 2).map((data, index) => (
            <div className=" border rounded-lg h-24" key={index}>
              <div className="p-4">
                <p className="text-sm font-bold">{data.name}</p>
                <div className="flex justify-between  items-center gap-3">
                  <p className="mt-4 text-sm">{data.course}</p>
                  <p className="mt-4 text-sm text-slate-500">
                    {data.pages} pages
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UI;
