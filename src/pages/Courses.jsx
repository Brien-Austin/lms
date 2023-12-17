import React from "react";
import { useSelector } from "react-redux";
import { coursesData } from "./dummy.data";

const Courses = () => {
  const currentCourseID = useSelector((state) => state.courseSelect.courseID);
  const filteredData = coursesData.filter(
    (course) => course.id === currentCourseID
  );
  return (
    <>
      {filteredData.map((data, index) => (
        <h1>{data.name}</h1>
      ))}
    </>
  );
};

export default Courses;
