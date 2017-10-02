import React from 'react';
import logo from './logo.svg';
import Animate from '../src/src/animate';
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
  reverseDelaySeconds,
  startAnimation,
  easeType,
  startReverseAnimate,
  onCompleteStyle,
  startStyle,
  endStyle,
  durationSeconds,
  count,
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
          reverseDelaySeconds,
        }}
        onComplete={() => console.log('Animation completed 🤘')}
        onCompleteStyle={parseJsonWithCatch(onCompleteStyle)}
        startStyle={parseJsonWithCatch(startStyle)}
        endStyle={parseJsonWithCatch(endStyle)}
        tag="span"
      >
        {Array(count)
          .fill()
          .map((item, key) => (
            <img
              src={logo}
              alt="logo"
              className={count === 1 ? 'demo-logo' : 'demo-small-logo'}
              key={key}
            />
          ))}
      </Animate>
    </div>
  );
}
