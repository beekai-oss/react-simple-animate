<div align="center"><p align="center"><a href="https://react-simple-animate.now.sh"><img src="https://raw.githubusercontent.com/bluebill1049/react-simple-animate/master/logo.png" alt="React Simple Animate Logo - UI Animation Made Simple" width="140px" /></a></p></div>

<h1 align="center">React Simple Animate</h1>

<p align="center">React UI animation made easy</p>

<div align="center">
    
[![npm downloads](https://img.shields.io/npm/dm/react-simple-animate.svg?style=for-the-badge)](https://www.npmjs.com/package/react-simple-animate) 
[![npm](https://img.shields.io/npm/dt/react-simple-animate.svg?style=for-the-badge)](https://www.npmjs.com/package/react-simple-animate) 
[![npm](https://img.shields.io/bundlephobia/minzip/react-simple-animate?style=for-the-badge)](https://bundlephobia.com/result?p=react-simple-animate)
[![Coverage Status](https://img.shields.io/coveralls/github/bluebill1049/react-simple-animate/master?style=for-the-badge)](https://coveralls.io/github/bluebill1049/react-simple-animate?branch=master)

</div>

## Features

- Animation from style A to B
- CSS keyframes animation
- Chain up animation sequences
- Tiny size without other dependency

## Install

    $ npm install react-simple-animate

## [Docs](https://react-simple-animate.now.sh/)

- [Getting started](https://react-simple-animate.now.sh/basics)
- [Animate](https://react-simple-animate.now.sh/animate)
- [AnimateKeyframes](https://react-simple-animate.now.sh/animate-keyframes)
- [AnimateGroup](https://react-simple-animate.now.sh/animate-group)
- [Custom Hooks](https://react-simple-animate.now.sh/hooks)
- [Advanced](https://react-simple-animate.now.sh/advanced)

## Animation lifecycle callbacks

`Animate` and `AnimateKeyframes` accept `onStart`, `onComplete`, and `onCancel`
callbacks. `Animate` uses CSS transition events, while `AnimateKeyframes` uses
CSS animation events. Each callback runs at most once for the current run, and
events bubbling from child elements are ignored. An infinite keyframe animation
does not naturally reach `onComplete`; stopping it triggers `onCancel` instead.

Set the `cancel` prop to `true` to stop a component's current run. Clear it
before starting another run. For hooks, call the returned `cancel()` method.
`play={false}` / `play(false)` selects the start or reverse path; cancelling does
not start that path. Cancelling a transition applies its target style without a
transition; cancelling keyframes removes the animation effect and restores the
underlying style. Hooks accept an `onCancel` callback, which runs once per
cancellation until the next `play()`.

When using the `render` prop, forward the event handlers it receives to the
element that owns the animation:

```jsx
function Example() {
  return (
    <Animate
      play
      start={{ opacity: 0 }}
      end={{ opacity: 1 }}
      onStart={() => console.log('started')}
      onComplete={() => console.log('completed')}
      onCancel={() => console.log('cancelled')}
      render={({
        style,
        onTransitionStart,
        onTransitionEnd,
        onTransitionCancel,
      }) => (
        <span
          style={style}
          onTransitionStart={onTransitionStart}
          onTransitionEnd={onTransitionEnd}
          onTransitionCancel={onTransitionCancel}
        />
      )}
    />
  );
}
```

Hooks return the corresponding handlers for the rendered element. For group
animations, `handlers` is aligned with `styles`:

```jsx
const {
  style,
  onTransitionStart,
  onTransitionEnd,
  onTransitionCancel,
} = useAnimate({ start: { opacity: 0 }, end: { opacity: 1 } });

return (
  <div
    style={style}
    onTransitionStart={onTransitionStart}
    onTransitionEnd={onTransitionEnd}
    onTransitionCancel={onTransitionCancel}
  />
);
```

## Quickstart

#### Components

```jsx
import React from "react";
import { Animate, AnimateKeyframes, AnimateGroup } from "react-simple-animate";

export default () => (
  <>
    {/* animate individual element. */}
    <Animate play start={{ opacity: 0 }} end={{ opacity: 1 }}>
      <h1>React simple animate</h1>
    </Animate>

    {/* animate keyframes with individual element. */}
    <AnimateKeyframes
      play
      iterationCount="infinite"
      keyframes={["opacity: 0", "opacity: 1"]}
    >
      <h1>React simple animate with keyframes</h1>
    </AnimateKeyframes>

    {/* animate group of animation in sequences */}
    <AnimateGroup play>
      <Animate start={{ opacity: 0 }} end={{ opacity: 1 }} sequenceIndex={0}>
        first
      </Animate>
      <Animate start={{ opacity: 0 }} end={{ opacity: 1 }} sequenceIndex={1}>
        second
      </Animate>
      <Animate start={{ opacity: 0 }} end={{ opacity: 1 }} sequenceIndex={2}>
        third
      </Animate>
    </AnimateGroup>
  </>
);

```

#### Hooks

```jsx
import react from 'react';
import { useAnimate, useAnimateKeyframes, useAnimateGroup } from 'react-simple-animate';

export const useAnimateExample = () => {
  const { style, play } = useAnimate({ start: { opacity: 0 }, end: { opacity: 1 } });
  useEffect(() => play(true), []);
  
  return <div style={style}>useAnimate</div>;
};

export const useAnimateKeyframesExample = () => {
  const { style, play } = useAnimateKeyframes({ 
    keyframes: ['opacity: 0', 'opacity: 1'], 
    iterationCount: 4 
  });
  useEffect(() => play(true), []);
  
  return <div style={style}>useAnimate</div>;
};

export const useAnimateGroup = () => {
  const { styles = [], play } = useAnimateGroup({
    sequences: [
      { start: { opacity: 1 }, end: { opacity: 0 } },
      { start: { background: "red" }, end: { background: "blue" } }
    ]
  });
  useEffect(() => play(true), []);

  return {styles.map(style => <div style={style}>useAnimateGroup</div>)};
};
```

## By the makers of BEEKAI

We also make [BEEKAI](https://www.beekai.com/). Build the next-generation forms with modern technology and best in class user experience and accessibility.
