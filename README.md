<div align="center"><p align="center"><a href="https://react-simple-animate.now.sh"><img src="https://raw.githubusercontent.com/bluebill1049/react-simple-animate/master/logo.png" alt="React Simple Animate Logo - UI Animation Made Simple" width="140px" /></a></p></div>

<h1 align="center">React Simple Animate</h1>

<p align="center">React UI animation made easy</p>

<div align="center">
    
[![Financial Contributors on Open Collective](https://opencollective.com/react-simple-animate/all/badge.svg?label=financial+contributors)](https://opencollective.com/react-simple-animate) [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=React+UI+animation+made+simple&url=https://react-simple-animate.now.sh/) [![CircleCI](https://circleci.com/gh/bluebill1049/react-simple-animate.svg?style=svg)](https://circleci.com/gh/bluebill1049/react-simple-animate) [![Coverage Status](https://coveralls.io/repos/github/bluebill1049/react-simple-animate/badge.svg?branch=master)](https://coveralls.io/github/bluebill1049/react-simple-animate?branch=master) [![npm downloads](https://img.shields.io/npm/dm/react-simple-animate.svg?style=flat-square)](https://www.npmjs.com/package/react-simple-animate) [![npm](https://img.shields.io/npm/dt/react-simple-animate.svg?style=flat-square)](https://www.npmjs.com/package/react-simple-animate) [![npm](https://badgen.net/bundlephobia/minzip/react-simple-animate)](https://badgen.net/bundlephobia/minzip/react-simple-animate)

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

## Contributors 
Thanks goes to these wonderful people:

<p float="left">
    <a href="https://github.com/blyszcz"><img src="https://avatars3.githubusercontent.com/u/16595589?s=400&v=4" width="50" height="50" /></a>
    <a href="https://github.com/tiaanduplessis"><img src="https://avatars0.githubusercontent.com/u/18066992?s=460&v=4" width="50" height="50" /></a>
    <a href="https://github.com/3stacks"><img src="https://avatars2.githubusercontent.com/u/14143193?s=60&v=4" width="50" height="50" /></a>
    <a href="https://github.com/willmcpo"><img src="https://avatars1.githubusercontent.com/u/13824314?s=60&v=4" width="50" height="50" /></a>
    <a href="https://github.com/atuttle"><img src="https://avatars2.githubusercontent.com/u/46990?s=460&v=4" width="50" height="50" /></a>
    <a href="https://github.com/vdekov"><img src="https://avatars1.githubusercontent.com/u/11061132?s=460&v=4" width="50" height="50" /></a>
    <a href="https://github.com/wle8300"><img src="https://avatars1.githubusercontent.com/u/150245?s=460&v=4" width="50" height="50" /></a>
    <a href="https://github.com/yusinto"><img src="https://avatars1.githubusercontent.com/u/1593077?s=460&v=4" width="50" height="50" /></a>
    <a href="https://github.com/pangpang1987"><img src="https://avatars1.githubusercontent.com/u/2181579?s=460&v=4" width="50" height="50" /></a>
</p>

## Contributors

### Code Contributors

This project exists thanks to all the people who contribute. [[Contribute](CONTRIBUTING.md)].
<a href="https://github.com/bluebill1049/react-simple-animate/graphs/contributors"><img src="https://opencollective.com/react-simple-animate/contributors.svg?width=890&button=false" /></a>

### Financial Contributors

Become a financial contributor and help us sustain our community. [[Contribute](https://opencollective.com/react-simple-animate/contribute)]

#### Individuals

<a href="https://opencollective.com/react-simple-animate"><img src="https://opencollective.com/react-simple-animate/individuals.svg?width=890"></a>

#### Organizations

Support this project with your organization. Your logo will show up here with a link to your website. [[Contribute](https://opencollective.com/react-simple-animate/contribute)]

<a href="https://opencollective.com/react-simple-animate/organization/0/website"><img src="https://opencollective.com/react-simple-animate/organization/0/avatar.svg"></a>
<a href="https://opencollective.com/react-simple-animate/organization/1/website"><img src="https://opencollective.com/react-simple-animate/organization/1/avatar.svg"></a>
<a href="https://opencollective.com/react-simple-animate/organization/2/website"><img src="https://opencollective.com/react-simple-animate/organization/2/avatar.svg"></a>
<a href="https://opencollective.com/react-simple-animate/organization/3/website"><img src="https://opencollective.com/react-simple-animate/organization/3/avatar.svg"></a>
<a href="https://opencollective.com/react-simple-animate/organization/4/website"><img src="https://opencollective.com/react-simple-animate/organization/4/avatar.svg"></a>
<a href="https://opencollective.com/react-simple-animate/organization/5/website"><img src="https://opencollective.com/react-simple-animate/organization/5/avatar.svg"></a>
<a href="https://opencollective.com/react-simple-animate/organization/6/website"><img src="https://opencollective.com/react-simple-animate/organization/6/avatar.svg"></a>
<a href="https://opencollective.com/react-simple-animate/organization/7/website"><img src="https://opencollective.com/react-simple-animate/organization/7/avatar.svg"></a>
<a href="https://opencollective.com/react-simple-animate/organization/8/website"><img src="https://opencollective.com/react-simple-animate/organization/8/avatar.svg"></a>
<a href="https://opencollective.com/react-simple-animate/organization/9/website"><img src="https://opencollective.com/react-simple-animate/organization/9/avatar.svg"></a>
