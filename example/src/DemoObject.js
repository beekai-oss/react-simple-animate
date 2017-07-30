import React from 'react';
import logo from './logo.svg';
import Animate from 'react-simple-animate';
import './DemoObject.css';

function parseJsonWithCatch(value) {
  try {
    return JSON.parse(value);
  } catch (e) {
    return false;
  }
}

export default function DemoObject({
  delaySeconds,
  startAnimation,
  easeType,
  startReverseAnimate,
  onCompleteStyle,
  startStyle,
  endStyle,
  durationSeconds,
}) {
  return (
    <div className="DemoObject-container">
      <Animate
        {...{
          delaySeconds,
          startAnimation,
          easeType,
          startReverseAnimate,
          durationSeconds,
        }}
        onCompleteStyle={parseJsonWithCatch(onCompleteStyle)}
        startStyle={parseJsonWithCatch(startStyle)}
        endStyle={parseJsonWithCatch(endStyle)}
      >
        <img src={logo} alt="logo" className="demo-logo" />
      </Animate>
    </div>
  );
}
