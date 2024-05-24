import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadProductsAsync } from './store/products';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Categories from './Components/Categories';
import Products from './Components/Products';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Storefront from './Components/StoreFront';
import ProductDetails from './Components/ProductDetails';
import ShoppingCart from './Components/ShoppingCart';

const LoadProducts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProductsAsync());
  }, [dispatch]);

  return null;
};

const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <hr />
      <Categories />
      <LoadProducts />
      <Products />
      <hr />
      <Footer />
      <Router>
      <Switch>
        <Route path="/products/:id" component={ProductDetails} />
        <Route path="/cart" component={ShoppingCart} />
        <Route path="/" component={Storefront} />
      </Switch>
    </Router>
    </Provider>
  );
};

export default App;