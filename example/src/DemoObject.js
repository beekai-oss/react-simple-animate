import React from 'react';
import logo from './logo.svg';
import Animate from 'react-simple-animate';
import Typography from 'material-ui/Typography';
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
  keys,
  clickHandler,
}) {
  return (
    <div className="DemoObject-container">
      <Animate
        startAnimation={count > 1}
        startStyle={{ ...parseJsonWithCatch(startStyle), maxHeight: 0 }}
        endStyle={{ ...parseJsonWithCatch(endStyle), maxHeight: '100px' }}
      >
        <Typography type="headline" component="h2" className="demoObject-title">
          Tap or click to remove the logo
        </Typography>
      </Animate>

      <Animate
        {...{
          delaySeconds,
          startAnimation,
          easeType,
          startReverseAnimate,
          durationSeconds,
          reverseDelaySeconds,
        }}
        animateOnAddRemove
        onComplete={() => console.log('Animation completed 🤘')}
        onCompleteStyle={parseJsonWithCatch(onCompleteStyle)}
        startStyle={parseJsonWithCatch(startStyle)}
        endStyle={parseJsonWithCatch(endStyle)}
        tag="span"
      >
        {keys.map(item => (
          <img
            key={item}
            src={logo}
            alt={`"logo id:${item}"`}
            onClick={() => clickHandler(item)}
            className={count === 1 ? 'demo-logo' : 'demo-small-logo'}
          />
        ))}
      </Animate>
    </div>
  );
}
