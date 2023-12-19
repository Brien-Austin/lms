import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: { id: "", name: "", isLoggedIn: false },
  reducers: {
    isGoogleAuthenticated: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.isLoggedIn = true;
    },

    isLoggedIn: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
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
