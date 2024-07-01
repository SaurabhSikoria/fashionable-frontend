import { createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  fetchCart,
  removeItemFromCart,
} from "../user/helper/carthelper";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    fetchCartDataStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    fetchCartDataSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload;
    },
    fetchCartDataFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    removeCartItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.product !== action.payload
      );
    },
  },
});

export const {
  fetchCartDataStart,
  fetchCartDataFailed,
  fetchCartDataSuccess,
  removeCartItem,
} = cartSlice.actions;

export const fetchCartData = (productId) => async (dispatch, getState) => {
  const isAuthenticated = getState().auth.isAuthenticated;
  if (isAuthenticated) {
    const userId = getState().auth.user.user._id;
    const token = getState().auth.user.token;
    try {
      dispatch(fetchCartDataStart());
      if (productId) {
        const cartData = await addToCart(userId, token, productId);
        if (!cartData.error) dispatch(fetchCartDataSuccess(cartData));
        dispatch(fetchCartDataFailed(cartData.error));
      } else {
        const cartData = await fetchCart(userId, token);
        dispatch(fetchCartDataSuccess(cartData));
      }
    } catch (error) {
      dispatch(fetchCartDataFailed(error));
    }
  } else if (productId) {
    console.log("Login to Add item to your Cart!");
  } else return null;
};

export const removeFromCart = (productId) => async (dispatch, getState) => {
  const userId = getState().auth.user.user._id;
  const token = getState().auth.user.token;
  try {
    dispatch(removeCartItem(productId));
    await removeItemFromCart(userId, token, productId);
  } catch (error) {
    console.log("Not Removed:" + error);
  }
};

export default cartSlice.reducer;
