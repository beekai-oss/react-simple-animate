import React, { Component } from 'react';
import Demo from './Demo';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import './App.css';

class App extends Component {
  render() {
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
}

export default App;
