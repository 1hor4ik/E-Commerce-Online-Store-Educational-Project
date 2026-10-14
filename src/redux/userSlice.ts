import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  password: null,
  token: null,
  avatarUrl: null,
  id: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.token = action.payload.token;
      state.avatarUrl = action.payload.avatarUrl;
      state.id = action.payload.id;
    },
    deleteUser(state) {
      state.email = null;
      state.password = null;
      state.token = null;
      state.avatarUrl = null;
      state.id = null;
    },
  },
});

export const { setUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
