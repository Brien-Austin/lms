import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import courseSlice from "./features/course/courseSlice";

export default configureStore({
  reducer: {
    authenticate: authSlice,
    courseSelect: courseSlice,
  },
});
