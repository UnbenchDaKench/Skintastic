import { createSlice } from "@reduxjs/toolkit";
import { SkincareProducts } from "../../../data/products/skincare/SkincareProducts";

// const initialState = [
//   {
//     index: 0,
//     category: "Skincare",
//     products: SkincareProducts,
//   },
// ];

const initialState = {
  skinCareProducts: SkincareProducts,
  selectedProduct: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clickProduct: (state, action) => {
      console.log(action.payload);
    
      state.selectedProduct = action.payload;
    },
  },
});

export const { clickProduct } = productSlice.actions;

export default productSlice.reducer;
