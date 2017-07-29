# React Simple Animate

> **Make web animation simple** :clap:

Features:

 - Simple animation from style A to style B
 - Make animation toggle easy
 - In build delay animation mechanic

## Install

    $ yarn add react-simple-animation
    or
    $ npm install react-simple-animation

##Quick start

    import react from 'react';
    import animate from 'react-simple-animate'
    
    export default function SexyComponent() {
	    return <Animate durationSeconds={0.2}
             startAnimation={startAnimation}
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

##Props

    startAnimation: boolean
Default value as false, set true when animation starts.
   
    children: mixed
Component to be animated

    startStyle: { [string]: string | number }
Component initial style

    endStyle: { [string]: string | number }
Component style when animation ends

    onCompleteStyle?: { [string]: string | number }
Optional props: style applies after animation ends

    durationSeconds: number
How long the animation should takes

    delaySeconds: number
How much delay should apply before animation starts

    reverseAnimation: boolean
Play animation from end to start style.

    easeType: string
Easing type refer to the http://easings.net/
    
    forceUpdate?: boolean,
Force the animation to re-render
    