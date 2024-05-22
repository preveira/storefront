
const initialState = {
  items:  []};

export const cartReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_TO_CART':
      return {items: [...state.items, action.payload]};
    default:
      return state;
  
  }

}

export const addToCart = (product) => {
  return {
    type: 'ADD_TO_CART',
    payload: product
  }
}