import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import React from 'react';
import Demo from './Demo';
import './App.css';

export default function App() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography type="title" color="inherit">
            React Simple Animate
          </Typography>
        </Toolbar>
      </AppBar>
      <Demo />
    </div>
  );
}
