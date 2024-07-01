import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryMenu: false,
  productMenu: false,
  profile: false,
  orders: false,
};

export const submenuSlice = createSlice({
  name: "submenu",
  initialState,
  reducers: {
    toggleCategoryMenu: (state) => {
      state.categoryMenu = !state.categoryMenu;
    },
    toggleProductMenu: (state) => {
      state.productMenu = !state.productMenu;
    },
    setProfile: (state) => {
      state.profile = true;
      state.orders = false;
    },
    setOrdersState: (state) => {
      state.profile = false;
      state.orders = true;
    },
  },
});

export const {
  toggleCategoryMenu,
  toggleProductMenu,
  setOrdersState,
  setProfile,
} = submenuSlice.actions;

export default submenuSlice.reducer;
