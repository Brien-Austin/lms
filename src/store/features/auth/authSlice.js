import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: { id: "", isLoggedIn: false },
  reducers: {
    isAuthenticated: (state, action) => {
      state.id = action.payload;
      state.isLoggedIn = true;
    },
  },
});

export const { isAuthenticated } = authSlice.actions;
export default authSlice.reducer;
