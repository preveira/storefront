import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CancelIcon from '@mui/icons-material/Cancel';
import { removeFromCart } from '../../store/cart';
import { selectTotal } from '../../store/cart';

export default function AnchorTemporaryDrawer({ state, toggleDrawer }) {
  const cartItems = useSelector(state => state.cart.items);
  const previouslyViewedItems = [];
  const dispatch = useDispatch();
  const totalPrice = useSelector(selectTotal);

  const handleRemoval = (item) => {
    dispatch(removeFromCart(item));
  }

  const list = (anchor) => {
    let itemCount = 0;
    for (let i = 0; i < cartItems.length; i++) {
      itemCount++;
    }

    return (
      <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          {cartItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => dispatch(handleRemoval(item))}>
                  {<CancelIcon/>}
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {previouslyViewedItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                {<CancelIcon/>}
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box sx={{ p: 2 }}>
          Total items in cart: {itemCount}
        </Box>
        <Box sx={{ p: 2 }}>
          Total Price: ${totalPrice}
        </Box>
      </Box>
    );
  };

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
