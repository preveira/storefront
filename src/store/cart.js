import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addToCartAsync = createAsyncThunk(
  'cart/addToCartAsync',
  async (product) => {
    const response = await axios.put(`/api/products/${product.id}`, { countInStock: product.countInStock - 1 });
    return response.data;
  }
);

export const removeFromCartAsync = createAsyncThunk(
  'cart/removeFromCartAsync',
  async (product) => {
    const response = await axios.put(`/api/products/${product.id}`, { countInStock: product.countInStock + 1 });
    return response.data;
  }
);

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
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items.splice(index, 1);
        }
      });
  },
});

export const selectTotal = (state) => 
  state.cart.items.reduce((total, item) => total + item.price, 0);

export const { addToCart, removeFromCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;