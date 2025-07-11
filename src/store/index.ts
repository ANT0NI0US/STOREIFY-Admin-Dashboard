import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slice/productSlice";
import userSlice from "./slice/userSlice";
import ordersSlice from "./slice/ordersSlice";
import loginSlice from "./slice/loginSlice";
import contactSlice from "./slice/contactSlice";

const store = configureStore({
  reducer: {
    login: loginSlice,
    product: productSlice,
    user: userSlice,
    order: ordersSlice,
    contact: contactSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;
