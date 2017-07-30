import Animate from './animate';
import Highlight from 'react-highlight';
import React from 'react';
import './DemoCode.css';

export default function DemoCode({
  showCode,
  startStyle,
  endStyle,
  easeType,
  startAnimation,
  startReverseAnimate,
  delaySeconds,
  onCompleteStyle,
  durationSeconds,
}) {
  return (
    <section className="DemoCode-container">
      <Animate
        startAnimation={showCode}
        startStyle={{
          transform: 'translateY(-300px)',
        }}
        endStyle={{
          transform: 'translateY(0)',
        }}
        easeType="cubic-bezier(0, 0, 0.24, 0.93)"
        forceUpdate
      >
        <Highlight>
          {`
    <Animate
      easeType="${easeType}"
      durationSeconds="${durationSeconds}"
      startAnimation=${startAnimation}
      startReverseAnimate=${startReverseAnimate}
      ${delaySeconds ? `delaySeconds=${delaySeconds}` : ''}
      ${onCompleteStyle ? `onCompleteStyle={${onCompleteStyle}}` : ''}
      startStyle={${startStyle}}
      endStyle={${endStyle}
    >
      <img src="logo" alt="logo" className="demo-logo" />
    </Animate>
              `}
        </Highlight>
      </Animate>
    </section>
  );
}
