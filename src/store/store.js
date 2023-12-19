import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import courseSlice from "./features/course/courseSlice";
import adminSlice from "./features/auth/adminSlice";
import signUpSlice from "./features/auth/signUpSlice";

export default configureStore({
  reducer: {
    authenticate: authSlice,
    admin: adminSlice,
    courseSelect: courseSlice,
    signup: signUpSlice,
  },
});
