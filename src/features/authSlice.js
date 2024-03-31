import { createSlice } from "@reduxjs/toolkit";
import { Api } from "../backend";

const initialState = {
  isAuthenticated: localStorage.getItem("jwt") ? true : false,
  user: JSON.parse(localStorage.getItem("jwt")),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticateUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    signoutUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { authenticateUser, signoutUser } = authSlice.actions;

export const signup = (user) => {
  return fetch(`${Api}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const signin = (user) => async (dispatch) => {
  console.log(user);
  return await fetch(`${Api}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) console.log("User not authenticated");
      else {
        localStorage.setItem("jwt", JSON.stringify(data));
        dispatch(authenticateUser(data));
      }
    })
    .catch((err) => console.log(err));
};

// export const authenticate = (data, next) => {
//   if (typeof window !== "undefined") {
//     localStorage.setItem("jwt", JSON.stringify(data));
//     next();
//   }
// };

export const signout = (next) => (dispatch) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    dispatch(signoutUser());
    next();

    return fetch(`${Api}/signout`, {
      method: "GET",
    })
      .then(() => console.log("signout success"))
      .catch((err) => console.log(err));
  }
};

export default authSlice.reducer;
