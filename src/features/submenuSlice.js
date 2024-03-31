import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryMenu: false,
  productMenu: false,
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
  },
});

export const { toggleCategoryMenu, toggleProductMenu } = submenuSlice.actions;

export default submenuSlice.reducer;
