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
    toggleProfile: (state) => (state.profile = !state.profile),
    toggleOrders: (state) => (state.orders = !state.orders),
  },
});

export const {
  toggleCategoryMenu,
  toggleProductMenu,
  toggleOrders,
  toggleProfile,
} = submenuSlice.actions;

export default submenuSlice.reducer;
