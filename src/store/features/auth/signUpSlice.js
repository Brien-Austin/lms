import { createSlice } from "@reduxjs/toolkit";

const signUpSlice = createSlice({
  name: "signup",
  initialState: {
    id: "",

    isLoggedIn: false,
  },
  reducers: {
    isSignuped: (state, action) => {
      state.id = action.payload;

      state.isLoggedIn = true;
    },
  },
});

export const { isSignuped } = signUpSlice.actions;
export default signUpSlice.reducer;
