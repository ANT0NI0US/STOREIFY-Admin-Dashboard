import { createSlice } from "@reduxjs/toolkit";
import { addOrder, getOrders } from "../service/ordersService";
import { orderServiceState } from "@/utils/types";

const initialState: orderServiceState = {
  isLoading: false,
  isCertainOrderLoading: false,
  allOrders: [],
  order: null,
  errors: null,
};

const ordersSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // all orders
    builder.addCase(getOrders.pending, (state) => {
      state.isLoading = true;
      state.errors = null;
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allOrders = action.payload || [];
      state.errors = null;
    });
    builder.addCase(getOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload as string;
    });

    // add new order
    builder.addCase(addOrder.pending, (state) => {
      state.isLoading = true;
      state.errors = null;
    });
    builder.addCase(addOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allOrders.push(action.payload);
      state.errors = null;
    });
    builder.addCase(addOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload as string;
    });
  },
});

export default ordersSlice.reducer;
