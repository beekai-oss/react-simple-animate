# React Simple Animate

> **Make web animation simple** :clap:

Features:

 - Simple animation from inline style A to style B
 - Make animation toggle easy
 - In-built delay animation mechanism
 - Tiny size 3,878 bytes (before Gzip)

## Install

    $ yarn add react-simple-animate
    or
    $ npm install react-simple-animate

## Example

Navigate into `example` folder and install

    $ yarn && yarn start
    or
    $ npm install && npm install -S

Screenshot of the example app below

<img src="https://raw.githubusercontent.com/bluebill1049/react-simple-animate/master/example/screenShot.png" alt="Screenshots" width="400"/>

## Quick start

    import react from 'react';
    import Animate from 'react-simple-animate';
    
    export default function SexyComponent() {
	    return <Animate durationSeconds={0.2}
             startAnimation
             delaySeconds={1.2}
             startStyle={{
               opacity: 0,
             }}
             endStyle={{
               opacity: 1,
             }}
           >
           <YourComponent> // your component here
        </Animate>;
    }

## API

| Prop | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `startAnimation` | boolean | ✓ | Defaults to false. Set to true to start the animation. |
| `children` | node | ✓ | Child component to be animated. |
| `startStyle` | string |  | Component initial inline style. |
| `endStyle` | string | ✓ | Component transition to inline style. |
| `onCompleteStyle` | string |  | Style to be applied after the animation is completed. |
| `durationSeconds` | number |  | How long the animation takes in seconds. |
| `delaySeconds` | number |  | How much delay should apply before animation starts. |
| `onComplete` | function |  | Call back function after animation complete. |
| `easeType` | string |  | Easing type refer to http://easings.net/ |
| `className` | string |  | To specify a CSS class. |
| `forceUpdate` | boolean |  | Force component to re-render. |
