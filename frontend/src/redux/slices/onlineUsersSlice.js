// redux/slices/onlineUsersSlice.js
import { createSlice } from "@reduxjs/toolkit";

const onlineUsersSlice = createSlice({
  name: "onlineUsers",
  initialState: [],
  reducers: {
    setOnlineUsers: (_, action) => action.payload, // overwrite list
  },
});
export const { setOnlineUsers } = onlineUsersSlice.actions;
export default onlineUsersSlice.reducer;
