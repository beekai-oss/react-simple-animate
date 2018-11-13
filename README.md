<div  style="height: 150px; border-radius: 20px; width: 150px;" align="center"><a href="https://react-simple-animate.now.sh"><img src="https://raw.githubusercontent.com/bluebill1049/react-simple-animate/master/example/logo.png" alt="React Simple Animate Logo - UI Animation Made Simple" width="150px" height="150px" /></a></div>

# [React Simple Animate](https://react-simple-animate.now.sh) &middot; [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=React+UI+animation+made+simple&url=https://react-simple-animate.now.sh/)&nbsp;[![npm version](https://img.shields.io/npm/v/react-simple-animate.svg?style=flat-square)](https://www.npmjs.com/package/react-simple-animate) [![npm downloads](https://img.shields.io/npm/dm/react-simple-animate.svg?style=flat-square)](https://www.npmjs.com/package/react-simple-animate) [![npm](https://img.shields.io/npm/dt/react-simple-animate.svg?style=flat-square)](https://www.npmjs.com/package/react-simple-animate) [![npm](https://img.shields.io/npm/l/react-simple-animate.svg?style=flat-square)](https://www.npmjs.com/package/react-simple-animate)

## Features:

- Simple animation from inline style A to style B
- React animation with CSS keyframes
- Chain up animation sequences
- Tiny size without other dependency

## Install

    $ yarn add react-simple-animate || npm install react-simple-animate

## [Docs](https://react-simple-animate.now.sh/)

- [Getting started](https://react-simple-animate.now.sh/basics)
- [Animate](https://react-simple-animate.now.sh/animate)
- [AnimateKeyframes](https://react-simple-animate.now.sh/animate-keyframes)
- [AnimateGroup](https://react-simple-animate.now.sh/animate-group)
- [Advanced](https://react-simple-animate.now.sh/advanced)

## Quick start

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
            </Animate>

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
