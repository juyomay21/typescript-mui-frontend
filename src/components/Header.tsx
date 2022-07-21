import React, { FC } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import logo from '../img/Mortal-Kombat-Logo.png'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

const Header: FC = () => {
  return  (
    <ThemeProvider theme={ darkTheme }>
      <AppBar className="App-bar" position="fixed" color='primary'>
        <Toolbar>
          <img src={ logo } className="App-logo" alt="logo" />
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;