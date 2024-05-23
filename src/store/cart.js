import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
  },
});

export const selectTotal = (state) => 
  state.cart.items.reduce((total, item) => total + item.price, 0);

export const { addToCart, removeFromCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;