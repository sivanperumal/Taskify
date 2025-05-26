import { createSlice } from "@reduxjs/toolkit";
import type { users, userState } from "../../interface";
import type { RootState } from "../store";
import { useSelector } from "react-redux";

const initialState: userState = {
  userList: localStorage.getItem("userLists")
    ? JSON.parse(localStorage.getItem("userLists") || "[]")
    : [],
  isAuthenticated: JSON.parse(
    localStorage.getItem("isAuthenticated") ?? "false"
  ),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userRegister: (state, action) => {
      state.userList.push(action.payload);
      const users = JSON.parse(localStorage.getItem("userLists") || "[]");
      users.push(action.payload);
      localStorage.setItem("userLists", JSON.stringify(users));
    },
    userLogin: (state, action) => {
      const userLists: users[] = state.userList;
      const credential: users = action.payload;

      const authenticate = userLists.some(
        (user) =>
          user.email === credential.email &&
          user.password === credential.password
      );

      localStorage.setItem("isAuthenticated", authenticate.toString());
      state.isAuthenticated = authenticate;
    },
    userLogout: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem("isAuthenticated");
    },
  },
});
export const { userRegister, userLogin, userLogout } = userSlice.actions;
export const useUser = () => {
  const userObj = useSelector((state: RootState) => state.user);
  return { ...userObj };
};
export default userSlice.reducer;
