import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../slices/products/productSlice";
import cartReducer from "../slices/cart/cartSlice"

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer
  },
});
