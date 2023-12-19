import React from "react";
import NavBar from "../components/NavBar";
import { notesData } from "./dummy.data";
import { Download } from "lucide-react";

const Notes = () => {
  return (
    <>
      <NavBar />
      <div className="mx-5">
        <div>
          <h1 className="text-xl  mt-10 font-bold">All Notes</h1>
          <div className="flex flex-col gap-3 mt-4 mb-24">
            {" "}
            {notesData.map((data, index) => (
              <div className=" border rounded-lg h-24" key={index}>
                <div className="p-4">
                  <p className="text-sm font-bold">{data.name}</p>
                  <div className="flex justify-between  items-center gap-3">
                    <p className="mt-4 text-sm">{data.course}</p>
                    <p className="mt-4 text-sm text-slate-500 flex gap-2 items-center ">
                      {data.pages} pages{" "}
                      <span className="text-black">
                        <Download />
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Notes;
