import Animate from 'react-simple-animate';
import Highlight from 'react-syntax-highlight';
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
  const code = `
  <Animate
    startAnimation=${startAnimation}
    startStyle={${startStyle}}
    endStyle={${endStyle}
    durationSeconds="${durationSeconds}"
    easeType="${easeType}"
    ${count > 1 ? 'animateOnAddRemove' : ''}
    ${delaySeconds ? `delaySeconds=${delaySeconds}` : ''}
    ${reverseDelaySeconds ? `reverseDelaySeconds={${reverseDelaySeconds}}` : ''}
    ${onCompleteStyle ? `onCompleteStyle={${onCompleteStyle}}` : ''}
  >
    ${count <= 1
      ? `<img src="logo" alt="logo" className="demo-logo" />`
      : `{keys.map((item, i) => (
      <img src={logo} key={i} />
    ))}`}
  </Animate>`;

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
        <Highlight lang="html" value={code.replace(/(^[ \t]*\n)/gm, '')} />
      </Animate>
    </section>
  );
}
