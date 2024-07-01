import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../backend";

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (order) => order._id === action.payload._id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.list = state.list.filter((order) => order._id !== action.payload);
      })
      .addMatcher(
        (action) =>
          action.type.startsWith("orders/") && action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("orders/") &&
          action.type.endsWith("/fulfilled"),
        (state) => {
          state.status = "succeeded";
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("orders/") &&
          action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      );
  },
});

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  return await fetch(`${Api}/orders/`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
});

export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ userId, orderId, status, token }) => {
    return await fetch(`${Api}/orders/${userId}/${orderId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  }
);

export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (orderId, token) => {
    return await fetch(`${Api}/orders/${orderId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  }
);

export default orderSlice.reducer;
