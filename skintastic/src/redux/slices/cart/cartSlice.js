import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.findIndex(
        (item) => item.product.productId === action.payload.product.productId
      );

      if (itemIndex !== -1) {
        const newState = [
          ...state.slice(0, itemIndex),
          {
            ...state[itemIndex],
            counter: state[itemIndex].counter + action.payload.counter,
          },
          ...state.slice(itemIndex + 1),
        ];
        return newState;
      }
      return [...state, action.payload];
    },
    addToCounter: (state, action) => {
      const itemIndex = state.findIndex(
        (item) => item.product.productId === action.payload
      );
      const newState = [
        ...state.slice(0, itemIndex),
        {
          ...state[itemIndex],
          counter: state[itemIndex].counter + 1,
        },
        ...state.slice(itemIndex + 1),
      ];
      return newState;
    },
    removeFromCounter: (state, action) => {
      const itemIndex = state.findIndex(
        (item) => item.product.productId === action.payload
      );
      const newState = [
        ...state.slice(0, itemIndex),
        {
          ...state[itemIndex],
          counter: state[itemIndex].counter - 1,
        },
        ...state.slice(itemIndex + 1),
      ];
      return newState;
    },
    deleteItem: (state, action) => {
      return state.filter((item) => item.product.productId !== action.payload);
    },
  },
});

export const { addToCart, addToCounter, removeFromCounter, deleteItem } =
  cartSlice.actions;

export default cartSlice.reducer;
