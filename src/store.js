import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import subMenuSlice from "./features/submenuSlice";
import cartSlice from "./features/cartSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    submenu: subMenuSlice,
    cart: cartSlice,
  },
});
