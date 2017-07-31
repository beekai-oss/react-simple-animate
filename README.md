# React Simple Animate

> **Make web animation simple** :clap:

Features:

 - Simple animation from inline style A to style B
 - Make animation toggle easy
 - In build delay animation mechanic

## Install

    $ yarn add react-simple-animate
    or
    $ npm install react-simple-animate

## Example

Navigate into `example` folder and install

    $ yarn
    or
    $ npm install
    
<img src="https://github.com/bluebill1049/react-simple-animate/blob/master/example/screenShot.png" alt="Sceen" width="400"/>

## Quick start

    import react from 'react';
    import Animate from 'react-simple-animate'
    
    export default function SexyComponent() {
	    return <Animate durationSeconds={0.2}
             startAnimation
             delaySeconds={1.2}
             startStyle={{
               opacity: 0,
               transform: 'translateY(100px)',
             }}
             endStyle={{
               opacity: 1,
               transform: 'translateY(0)',
             }}
           >
           <YourComponent> // your component here
        </Animate>;
    }

## API

    startAnimation: boolean
Defaults to false. Set to true to start the animation.
   
    children: node
Child component to be animated.

    startStyle: string
Component initial inline style.

    endStyle: string
Component transition to inline style.

    onCompleteStyle: string (optional)
Style to be applied after the animation is completed.

    durationSeconds: number
How long the animation takes in seconds.

    delaySeconds: number (optional)
How much delay should apply before animation starts.

    reverseAnimation: boolean (optional)
Play animation from end to start style.

    easeType: string (optional)
Easing type refer to http://easings.net/
    
    forceUpdate?: boolean
Force component to re-render.
    