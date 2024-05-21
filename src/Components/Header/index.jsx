import React from 'react';
import { Button, Drawer } from '@mui/material';


const Header = () => {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <>
    <div>
    <h1>
      Kicks and Threads Store
    </h1>
    </div>
    <div>
    <header>
      <Button onClick={toggleDrawer('right', true)}>Open Drawer</Button>
      <Drawer state={state} toggleDrawer={toggleDrawer} />
    </header>
    </div>
    </>
  );
};

export default Header;