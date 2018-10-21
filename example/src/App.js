import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Demo from './Demo';
import Button from '@material-ui/core/Button';
import './App.css';

export default function App() {
  return (
    <div className="App-bar">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit">
            React Simple Animate
          </Typography>

          <a href="https://medium.com/jsdownunder/react-ui-animation-made-simple-c2ff98056659">
            <Button
              style={{
                color: 'white',
              }}
              color="default"
            >
              Blog
            </Button>
          </a>

          <a href="https://github.com/bluebill1049/react-simple-animate">
            <Button
              style={{
                color: 'white',
              }}
              color="default"
            >
              Github
            </Button>
          </a>
        </Toolbar>
      </AppBar>
      <Demo />
    </div>
  );
}
