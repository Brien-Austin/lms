import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "course",
  initialState: {
    courseID: "",
  },
  reducers: {
    currentCourse: (state, action) => {
      state.courseID = action.payload;
    },
  },
});

export const { currentCourse } = courseSlice.actions;
export default courseSlice.reducer;
