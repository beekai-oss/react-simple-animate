import Animate from 'react-simple-animate';
import Highlight from 'react-highlight';
import React from 'react';
import './DemoCode.css';

export default function DemoCode({
  showCode,
  startStyle,
  endStyle,
  easeType,
  startAnimation,
  delaySeconds,
  reverseDelaySeconds,
  onCompleteStyle,
  durationSeconds,
  count,
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
      ${delaySeconds ? `delaySeconds=${delaySeconds}` : ''}
      ${reverseDelaySeconds
        ? `reverseDelaySeconds={${reverseDelaySeconds}}`
        : ''}
      ${onCompleteStyle ? `onCompleteStyle={${onCompleteStyle}}` : ''}
      startStyle={${startStyle}}
      endStyle={${endStyle}
    >
      ${count <= 1
        ? `<img src="logo" alt="logo" className="demo-logo" />`
        : `{keys.map(item => (
        <img
          src={logo}
          key={item}
        />
      ))}`}
    </Animate>
              `}
        </Highlight>
      </Animate>
    </section>
  );
}
