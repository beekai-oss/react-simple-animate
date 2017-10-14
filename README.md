# React Simple Animate

[![npm version](https://img.shields.io/npm/v/react-simple-animate.svg?style=flat-square)](https://www.npmjs.com/package/react-simple-animate) [![npm downloads](https://img.shields.io/npm/dm/react-simple-animate.svg?style=flat-square)](https://www.npmjs.com/package/react-simple-animate) [![npm](https://img.shields.io/npm/dt/react-simple-animate.svg?style=flat-square)](https://www.npmjs.com/package/react-simple-animate) [![npm](https://img.shields.io/npm/l/react-simple-animate.svg?style=flat-square)](https://www.npmjs.com/package/react-simple-animate)

> **Make web animation simple** :clap:

Features:

 - Simple animation from inline style A to style B
 - Support will mount and unmount (New)
 - Make animation toggle easy
 - In-built delay animation mechanism
 - Tiny size without other dependency

## Install

    $ yarn add react-simple-animate
    or
    $ npm install react-simple-animate -S

## Example

[Check out the interactive demo.](https://react-simple-animate.herokuapp.com/) 😍

Navigate into `example` folder and install

    $ yarn && yarn start
    or
    $ npm install && npm run start

Screenshot of the example app below

<img src="https://raw.githubusercontent.com/bluebill1049/react-simple-animate/master/example/screenShot.png" alt="Screenshots" width="400"/>

## Quick start

The following example demonstrate animate **individual** or **array of components**. React simple animate will take cares component **will mount** and **unmount**. 

    import react from 'react';
    import Animate from 'react-simple-animate';
    import YourComponent from './YourComponent';
    
    export default function SexyComponent(props) {
	    return <Animate durationSeconds={0.2}
             startAnimation
             startStyle={{
               opacity: 0,
             }}
             endStyle={{
               opacity: 1,
             }}
           >
           {Array.isArray(props.componentsArray) ? 
             props.componentsArray.map((key) => <YourComponent key={key}>)
             : <YourComponent>}
        </Animate>;
    }

## API

| Prop | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `startAnimation` | boolean | ✓ | Defaults to false. Set to true to start the animation. |
| `children` | node | ✓ | Child component to be animated. |
| `startStyle` | string |  | Component initial inline style. |
| `endStyle` | string | ✓ | Component transition to inline style. |
| `tag` | string |  |  Default tag is div, this allow custom tag to be wrap around. |
| `onCompleteStyle` | string |  | Style to be applied after the animation is completed. |
| `durationSeconds` | number |  | How long the animation takes in seconds, same apply to mount and unmount. |
| `delaySeconds` | number |  | How much delay should apply before animation starts. |
| `reverseDelaySeconds` | number |  | How much delay should apply when reverse/toggle animation. |
| `onComplete` | function |  | Call back function after animation complete. |
| `onError` | function |  | Call back function after component error (**React 16 only**). |
| `easeType` | string |  | Easing type refer to http://easings.net/ |
| `className` | string |  | To specify a CSS class. |
| `forceUpdate` | boolean |  | Force component to re-render. |