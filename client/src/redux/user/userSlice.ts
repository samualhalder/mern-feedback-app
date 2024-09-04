import { createSlice } from "@reduxjs/toolkit";

export interface User {
  _id: string;
  username: string;
  email: string;
  photoURL: string;
}
export interface UserState {
  currentUser: User | null;
}

// Initialize the state with the type UserState
const initialState: UserState = {
  currentUser: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInSuccesfull: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("feedback-user", JSON.stringify(action.payload));
    },
    signOut: (state) => {
      state.currentUser = null;
      localStorage.removeItem("feedback-user");
    },
  },
});

export const { signInSuccesfull, signOut } = userSlice.actions;
export default userSlice.reducer;
