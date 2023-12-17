import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: { id: "", isLoggedIn: false },
  reducers: {
    isGoogleAuthenticated: (state, action) => {
      state.id = action.payload;
      state.isLoggedIn = true;
    },
    isSignedUp: (state, action) => {
      state.id = action.payload;
      state.isLoggedIn = true;
    },
    isLoggedIn: (state, action) => {
      state.id = action.payload;
      state.isLoggedIn = true;
    },
    isAdminLoggedIn: (state, action) => {
      state.id = action.payload;
      state.isLoggedIn = true;
    },
  },
});

export const {
  isGoogleAuthenticated,
  isAdminLoggedIn,
  isSignedUp,
  isLoggedIn,
} = authSlice.actions;
export default authSlice.reducer;
