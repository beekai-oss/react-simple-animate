import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import React from 'react';
import Demo from './Demo';
import Button from 'material-ui/Button';
import './App.css';

export default function App() {
  return (
    <div className="App-bar">
      <AppBar position="static">
        <Toolbar>
          <Typography type="title" color="inherit">
            React Simple Animate
          </Typography>

          <a href="https://medium.com/jsdownunder/react-ui-animation-made-simple-c2ff98056659">
            <Button color="contrast">Blog</Button>
          </a>

          <a href="https://github.com/bluebill1049/react-simple-animate">
            <Button color="contrast">Github</Button>
          </a>
        </Toolbar>
      </AppBar>
      <Demo />
    </div>
  );
}
