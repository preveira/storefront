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
    <header style= {{ display: 'flex', alignContent: 'space-between'}}>
      <div>
        <h1 style={{marginLeft: '30px'}}>
          Kicks and Threads Store
        </h1>
      </div>
      <div>
        <div>
        <Button 
        onClick={toggleDrawer('right', true)}
        xs={{ alignText: 'center'}}
        >Cart</Button>
        </div>
        <Drawer state={state} toggleDrawer={toggleDrawer} />
      </div>
    </header>
  );
};

export default Header;