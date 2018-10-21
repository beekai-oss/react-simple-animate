<p align="center">
    <img width="675" src="https://raw.githubusercontent.com/bluebill1049/react-simple-animate/master/example/logo.png" alt="React Simple Animate Logo - UI Animation Made Simple" />
</p>

[![npm version](https://img.shields.io/npm/v/react-simple-animate.svg?style=flat-square)](https://www.npmjs.com/package/react-simple-animate)
[![npm downloads](https://img.shields.io/npm/dm/react-simple-animate.svg?style=flat-square)](https://www.npmjs.com/package/react-simple-animate)
[![npm](https://img.shields.io/npm/dt/react-simple-animate.svg?style=flat-square)](https://www.npmjs.com/package/react-simple-animate)
[![npm](https://img.shields.io/npm/l/react-simple-animate.svg?style=flat-square)](https://www.npmjs.com/package/react-simple-animate)

> **Make web animation simple** :clap:

Features:

- Simple animation from inline style A to style B
- Support react animate keyframes (New)
- Chain up animation sequences (New)
- Support add and remove child
- Tiny size without other dependency

## Install

    $ yarn add react-simple-animate || npm install react-simple-animate

## Example

[Check out the interactive demo.](https://react-simple-animate.herokuapp.com) 😍

<a target="_blank" href="https://react-simple-animate.herokuapp.com"><img src="https://raw.githubusercontent.com/bluebill1049/react-simple-animate/master/example/screenShot.png" alt="Screenshots" width="400"/></a>

Navigate into `example` folder and install

    $ yarn && yarn start || npm install && npm run start

## Quick start

    import react from 'react';
    import { Animate, AnimateGroup } from 'react-simple-animate';

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

## Animate API

| Prop                     | Type     | Required | Description                                                                            |
| :----------------------- | :------- | :------: | :------------------------------------------------------------------------------------- |
| `play`                   | boolean  |    ✓     | Defaults to false. Set to true to start the animation.                                 |
| `render`                 | Function |          | Element animation attributes as argument eg. `(attributes) => <div {...attributes} />` |
| `startStyle`             | string   |          | Component initial inline style.                                                        |
| `endStyle`               | string   |    ✓     | Component transition to inline style.                                                  |
| `onCompleteStyle`        | string   |          | Style to be applied after the animation is completed.                                  |
| `durationSeconds`        | number   |          | How long the animation takes in seconds.                                               |
| `delaySeconds`           | number   |          | How much delay should apply before animation starts.                                   |
| `reverseDurationSeconds` | number   |          | How long the reverse/toggle animation takes in seconds.                                |
| `reverseDelaySeconds`    | number   |          | How much delay should apply when reverse/toggle animation.                             |
| `onComplete`             | function |          | Call back function after animation complete.                                           |
| `sequenceIndex`          | number   |          | `AnimateGroup`: Animate will be trigger from 0 to n number                             |
| `sequenceId`             | string   |          | `AnimateGroup`: Unique id to associate with AnimationGroup sequences                   |
| `overlaySeconds`         | number   |          | `AnimateGroup`: When animation need to play ahead and overlay on top of the previous   |
| `easeType`               | string   |          | Easing type refer to http://easings.net/                                               |
| `mount`                  | boolean  |          | Will mount component then apply animation                                              |
| `unMount`                | boolean  |          | Will apply animation to start style and then delete the element                        |

## AnimateKeyframes API

| Prop              | Type     | Required | Description                                                                                                                                                     |
| :---------------- | :------- | :------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `play`            | boolean  |    ✓     | Defaults to false. Set to true to start the animation.                                                                                                          |
| `render`          | Function |          | Element animation attributes as argument eg. `(attributes) => <div {...attributes} />`                                                                          |
| `keyframes`       | Array    |    ✓     | Array of styles or Array of Object, object key as the keyframe start % eg. `['opacity:0']` or `[{0:'opacity:0', 100:'opacity:0'}]`                              |
| `durationSeconds` | number   |          | How long the animation takes in seconds.                                                                                                                        |
| `delaySeconds`    | number   |          | How much delay should apply before animation starts.                                                                                                            |
| `easeType`        | string   |          | Easing type refer to http://easings.net/                                                                                                                        |
| `direction`       | number   |          | Number of times an animation cycle should be played - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/animation-iteration-count">Link</a>             |
| `iterationCount`  | string   |          | animation applies styles to its target before and after its execution - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode">Link</a> |
| `animationStates` | string   |          | An animation is running or paused - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/animation-play-state">Link</a>                                    |
| `fillMode`        | string   |          | animation applies styles to target before and after execution - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode">Link</a>         |
| `sequenceIndex`   | number   |          | `AnimateGroup`: Animate will be trigger from 0 to n number                                                                                                      |
| `sequenceId`      | string   |          | `AnimateGroup`: Unique id to associate with AnimationGroup sequences                                                                                            |
| `overlaySeconds`  | number   |          | `AnimateGroup`: When animation need to play ahead and overlay on top of the previous                                                                            |

## AnimateGroup API

| Prop               | Type    | Required | Description                                                                                                      |
| :----------------- | :------ | :------: | :--------------------------------------------------------------------------------------------------------------- |
| `play`             | boolean |    ✓     | Defaults to false. Set to true to start the group animation.                                                     |
| `sequences`        | Array   |          | Array with animation props, it can contain `sequenceId` to reference with Animate `sequenceId`.                  |
| `reverseSequences` | Array   |          | Array with animation props on reverse order, it can contain `sequenceId` to reference with Animate `sequenceId`. |

## Advance Example

Set up animation sequence with `sequenceId` 😘

    import react from 'react';
    import { Animate, AnimateGroup } from 'react-simple-animate';

    const props = {
        startStyle: { opacity: 0 },
        endStyle: { opacity: 1 }
    };

    export default () =>
        <AnimateGroup play sequences={[
            { sequenceId: 'header', ...props } // play first
            { sequenceId: 'content', ...props, overlaySeconds: 0.1 } // play during header animation and overlay by 0.1s
            { sequenceId: 'footer', ...props, delaySeconds: 0.4 } // play after content with 0.4s seconds delay
        ]}>
            <Animate sequenceId="header" />
            <Animate sequenceId="content" />
            <Animate sequenceId="footer" />
        </AnimateGroup>
    );

## Reference

https://medium.com/jsdownunder/react-ui-animation-made-simple-c2ff98056659
