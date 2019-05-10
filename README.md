<div align="center"><a href="https://react-simple-animate.now.sh"><img src="https://raw.githubusercontent.com/bluebill1049/react-simple-animate/master/example/logo.png" alt="React Simple Animate Logo - UI Animation Made Simple" width="180px" height="180px" /></a></div>

# [React Simple Animate](https://react-simple-animate.now.sh) 
[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=React+UI+animation+made+simple&url=https://react-simple-animate.now.sh/) [![CircleCI](https://circleci.com/gh/bluebill1049/react-simple-animate.svg?style=svg)](https://circleci.com/gh/bluebill1049/react-simple-animate) [![Coverage Status](https://coveralls.io/repos/github/bluebill1049/react-simple-animate/badge.svg?branch=master)](https://coveralls.io/github/bluebill1049/react-simple-animate?branch=master) [![npm downloads](https://img.shields.io/npm/dm/react-simple-animate.svg?style=flat-square)](https://www.npmjs.com/package/react-simple-animate) [![npm](https://img.shields.io/npm/dt/react-simple-animate.svg?style=flat-square)](https://www.npmjs.com/package/react-simple-animate) [![npm](https://badgen.net/bundlephobia/minzip/react-simple-animate)](https://badgen.net/bundlephobia/minzip/react-simple-animate)

- Animation from style A to B
- CSS keyframes animation
- Chain up animation sequences
- Tiny size without other dependency

## Install

    $ npm install react-simple-animate

## [Docs](https://react-simple-animate.now.sh/)

- [Getting started](https://react-simple-animate.now.sh/basics)
- [Quick Tutorial](https://alligator.io/react/craft-simple-animations-in-react/)
- [Animate](https://react-simple-animate.now.sh/animate)
- [AnimateKeyframes](https://react-simple-animate.now.sh/animate-keyframes)
- [AnimateGroup](https://react-simple-animate.now.sh/animate-group)
- [Custom Hooks](https://react-simple-animate.now.sh/hooks)
- [Advanced](https://react-simple-animate.now.sh/advanced)

## Quickstart

```jsx
import react from 'react';
import { Animate, AnimateKeyframes, AnimateGroup } from 'react-simple-animate';

const props = {
  startStyle: { opacity: 0 }
  endStyle: { opacity: 1 }
};

export default () => {
  return (
    // This example demonstrate animate individual element.
    <Animate play {...props}>
      <h1>React simple animate</h1>
    </Animate>

    // This example demonstrate animate keyframes with individual element.
    <AnimateKeyframes play iterationCount="infinite" keyframes={['opacity: 0', 'opacity: 1']}>
      <h1>React simple animate with keyframes</h1>
    </AnimateKeyframes>

    // This example demonstrate animate group of animation with sequenceIndex.
    <AnimateGroup play>
      <Animate {...props} sequenceIndex={0} />
      <p>Next animation below: </p>
      <Animate {...props} sequenceIndex={1} />
      <p>Final animation below: </p>
      <Animate {...props} sequenceIndex={2} />
    </AnimateGroup>
  );
};
```

## Contributors 
Thanks goes to these wonderful people:

<p float="left">
    <a href="https://github.com/3stacks"><img src="https://avatars2.githubusercontent.com/u/14143193?s=60&v=4" width="50" height="50" /></a>
    <a href="https://github.com/willmcpo"><img src="https://avatars1.githubusercontent.com/u/13824314?s=60&v=4" width="50" height="50" /></a>
    <a href="https://github.com/atuttle"><img src="https://avatars2.githubusercontent.com/u/46990?s=460&v=4" width="50" height="50" /></a>
    <a href="https://github.com/vdekov"><img src="https://avatars1.githubusercontent.com/u/11061132?s=460&v=4" width="50" height="50" /></a>
    <a href="https://github.com/wle8300"><img src="https://avatars1.githubusercontent.com/u/150245?s=460&v=4" width="50" height="50" /></a>
</p>
