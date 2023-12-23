import { createSlice } from "@reduxjs/toolkit";

const logoutSlice = createSlice({
  name: "logout",
  initialState: {
    id: "",
    name: "",
    isLoggedOut: false,
  },
  reducers: {
    isLoggedOut: (state) => {
      state.isLoggedIn = true;
    },
  },
});

export const { isLoggedOut } = logoutSlice.actions;
export default logoutSlice.reducer;
