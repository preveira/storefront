import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loadProductsAsync = createAsyncThunk(
  'products/loadProductsAsync',
  async () => {
    const response = await axios.get('/api/products');
    return response.data;
  }
);

let productId = 0;

export const createProduct = (
  category,
  name,
  desc,
  image,
  price,
  countInStock,
) => ({
  id: productId++,
  category,
  name,
  description: desc,
  image,
  price,
  countInStock,
});

const initialState = {
  products: [
    createProduct(
      "Threads",
      "Blue Steel",
      "Elevate your style game with a sharp, modern blue suit that turns heads.",
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVucyUyMGZhc2hpb258ZW58MHx8MHx8fDA%3D",
      450.0,
      45,
    ),
    createProduct(
      "Kicks",
      "Stussy Creamsicles",
      "Step into summer vibes with the fresh and stylish Nike Stussy Creamsicles.",
      "https://images.unsplash.com/photo-1608319318013-290bac041539?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGtpY2tzfGVufDB8fDB8fHww",
      150.0,
      25,
    ),
    createProduct(
      "Threads",
      "Grey Fushion",
      "Stay sleek and sophisticated in a timeless grey suit that's always in vogue.",
      "https://images.unsplash.com/photo-1619102814948-e164e584cf0c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fG1lbnMlMjBmYXNoaW9ufGVufDB8fDB8fHww",
      400.0,
      15,
    ),
    createProduct(
      "Kicks",
      "Cream Soda",
      "Quench your sneaker thirst with the ultra-cool Nike Cream Soda kicks.",
      "https://images.unsplash.com/photo-1617143207675-e7e6371f5f5d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGtpY2tzfGVufDB8fDB8fHww",
      180.0,
      35,
    ),
  ],
  filteredProducts: [
    createProduct(
      "Threads",
      "Blue Steel",
      "Elevate your style game with a sharp, modern blue suit that turns heads.",
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVucyUyMGZhc2hpb258ZW58MHx8MHx8fDA%3D",
      450.0,
      45,
    ),
    createProduct(
      "Kicks",
      "Stussy Creamsicles",
      "Step into summer vibes with the fresh and stylish Nike Stussy Creamsicles.",
      "https://images.unsplash.com/photo-1608319318013-290bac041539?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGtpY2tzfGVufDB8fDB8fHww",
      150.0,
      25,
    ),
    createProduct(
      "Threads",
      "Grey Fushion",
      "Stay sleek and sophisticated in a timeless grey suit that's always in vogue.",
      "https://images.unsplash.com/photo-1619102814948-e164e584cf0c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fG1lbnMlMjBmYXNoaW9ufGVufDB8fDB8fHww",
      400.0,
      15,
    ),
    createProduct(
      "Kicks",
      "Cream Soda",
      "Quench your sneaker thirst with the ultra-cool Nike Cream Soda kicks.",
      "https://images.unsplash.com/photo-1617143207675-e7e6371f5f5d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGtpY2tzfGVufDB8fDB8fHww",
      180.0,
      35,
    ),
  ],
};

const FILTER = 'FILTER';
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER:
      return {
        ...state,
        filter: action.payload,
      };

    case ADD_TO_CART:
    case REMOVE_FROM_CART:
      return {
        ...state,
        products: state.products.map(product => 
          product.id === action.payload ? { ...product, countInStock: product.countInStock + (action.type === ADD_TO_CART ? -1 : 1) } : product
        ),
      };

    default:
      return state;
  }
};

export const productsFilter = (category) => {
  return {
    type: "FILTER",
    payload: category,
  };
};

export const getFilteredProducts = (state) => {
  const filter = state.filter;
  if (!filter) {
    return state.products;
  }
  return state.products.filter(product => product.category === filter);
};


const productsSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const product = state.find(product => product.id === action.payload);
      if (product) {
        product.countInStock--;
      }
    },
    removeFromCart: (state, action) => {
      const product = state.find(product => product.id === action.payload);
      if (product) {
        product.countInStock++;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadProductsAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { actions, reducer } = productsSlice;
