
import { configureStore } from '@reduxjs/toolkit'
import { productReducer } from './products.js';
import { categoryReducer } from './categories';
import { cartReducer } from './cart.js';

export default configureStore({
  reducer: {
    product: productReducer,
    category: categoryReducer,
    cart: cartReducer,
  }
});