import { createSlice } from "@reduxjs/toolkit";
import {
  getProducts,
  addProduct,
  deleteProduct,
  editProduct,
} from "../service/productService";
import { productServiceState } from "@/utils/types";

const initialState: productServiceState = {
  isLoading: false,
  allProducts: [],
  product: {},
  errors: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // all products
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
        state.errors = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allProducts = action.payload || [];
        state.errors = null;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload as string;
      })

      // add new product
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
        state.errors = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allProducts.push(action.payload);
        state.errors = null;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload as string;
      })

      // EDIT EXIST PRODUCT
      .addCase(editProduct.pending, (state) => {
        state.isLoading = true;
        state.errors = null;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allProducts = state.allProducts.map((product) =>
          product.id === action.payload.id ? action.payload : product,
        );
        state.errors = null;
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload as string;
      })

      // delete product
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.errors = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allProducts = state.allProducts.filter(
          (product) => product.id !== action.payload,
        );
        state.errors = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload as string;
      });
  },
});

export default productSlice.reducer;
