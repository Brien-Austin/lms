import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    id: "",
    name: "",
    isLoggedIn: false,
  },
  reducers: {
    isAdminLoggedIn: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.isLoggedIn = true;
    },
  },
});

export const { isAdminLoggedIn } = adminSlice.actions;
export default adminSlice.reducer;
