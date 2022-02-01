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

## Sponsors

Thank you very much for those kind people with their sponsorship to this project.

<p>
    <a href="https://github.com/sayav"
    ><img
            src="https://avatars1.githubusercontent.com/u/42376060?s=60&amp;v=4"
            width="45"
            height="45"
            alt="@sayav"
    /></a>
    <a href="https://github.com/lemcii"
    ><img
            src="https://avatars1.githubusercontent.com/u/35668113?s=60&amp;v=4"
            width="45"
            height="45"
            alt="@lemcii"
    /></a>
    <a href="https://github.com/washingtonsoares"
    ><img
            src="https://avatars.githubusercontent.com/u/5726140?v=4"
            width="45"
            height="45"
            alt="@washingtonsoares"
    /></a>
    <a href="https://github.com/lixunn"
    ><img
            src="https://avatars.githubusercontent.com/u/4017964?v=4"
            width="45"
            height="45"
            alt="@lixunn"
    /></a>
    <a href="https://github.com/SamSamskies"
    ><img
            src="https://avatars2.githubusercontent.com/u/3655410?s=60&amp;v=4"
            width="45"
            height="45"
            alt="@SamSamskies"
    /></a>
    <a href="https://github.com/peaonunes"
    ><img
            src="https://avatars2.githubusercontent.com/u/3356720?s=60&amp;v=4"
            width="45"
            height="45"
            alt="@peaonunes"
    /></a>
    <a href="https://github.com/wilhelmeek"
    ><img
            src="https://avatars2.githubusercontent.com/u/609452?s=60&amp;v=4"
            width="45"
            height="45"
            alt="@wilhelmeek"
    /></a>
    <a href="https://github.com/iwarner"
    ><img
            src="https://avatars2.githubusercontent.com/u/279251?s=60&amp;v=4"
            width="45"
            height="45"
            alt="@iwarner"
    /></a>
    <a href="https://github.com/joejknowles"
    ><img
            src="https://avatars2.githubusercontent.com/u/10728145?s=60&amp;v=4"
            width="45"
            height="45"
            alt="@joejknowles"
    /></a>
    <a href="https://github.com/chris-gunawardena"
    ><img
            src="https://avatars0.githubusercontent.com/u/5763108?s=60&amp;v=4"
            width="45"
            height="45"
            alt="@chris-gunawardena"
    /></a>
    <a href="https://github.com/Tymek"
    ><img
            src="https://avatars1.githubusercontent.com/u/2625371?s=60&amp;v=4"
            width="45"
            height="45"
            alt="@Tymek"
    /></a>
    <a href="https://github.com/Luchanso"
    ><img
            src="https://avatars0.githubusercontent.com/u/2098777?s=60&amp;v=4"
            width="45"
            height="45"
            alt="@Luchanso"
    /></a>
    <a href="https://github.com/vcarel"
    ><img
            src="https://avatars1.githubusercontent.com/u/1541093?s=60&amp;v=4"
            width="45"
            height="45"
            alt="@vcarel"
    /></a>
    <a href="https://github.com/gragland"
    ><img
            src="https://avatars0.githubusercontent.com/u/1481077?s=60&amp;v=4"
            width="45"
            height="45"
            alt="@gragland"
    /></a>
    <a href="https://github.com/tjshipe"
    ><img
            src="https://avatars2.githubusercontent.com/u/1254942?s=60&amp;v=4"
            width="45"
            height="45"
            alt="@tjshipe"
    /></a>
    <a href="https://github.com/krnlde"
    ><img
            src="https://avatars1.githubusercontent.com/u/1087002?s=60&amp;v=4"
            width="45"
            height="45"
            alt="@krnlde"
    /></a>
    <a href="https://github.com/msutkowski"
    ><img
            src="https://avatars2.githubusercontent.com/u/784953?s=60&amp;v=4"
            width="45"
            height="45"
            alt="@msutkowski"
    /></a>
    <a href="https://github.com/mlukaszczyk"
    ><img
            src="https://avatars3.githubusercontent.com/u/599247?s=60&amp;v=4"
            width="45"
            height="45"
            alt="@mlukaszczyk"
    /></a>
    <a href="https://github.com/susshma"
    ><img
            src="https://avatars0.githubusercontent.com/u/2566818?s=460&u=754ee26b96e321ff28dbc4a2744132015f534fe0&v=4"
            width="45"
            height="45"
    /></a>
    <a href="https://github.com/MatiasCiccone"
    ><img
            src="https://avatars3.githubusercontent.com/u/32602795?s=460&u=6a0c4dbe23c4f9a5628dc8867842b75989ecc4aa&v=4"
            width="45"
            height="45"
    /></a>
    <a href="https://github.com/ghostwriternr"
    ><img
            src="https://avatars0.githubusercontent.com/u/10023615?s=460&u=3ec1e4ba991699762fd22a9d9ef47a0599f937dc&v=4"
            width="45"
            height="45"
    /></a>
    <a href="https://github.com/neighborhood999"
    ><img
            src="https://avatars3.githubusercontent.com/u/10325111?s=450&u=f60c932f81d95a60f77f5c7f2eab4590e07c29af&v=4"
            width="45"
            height="45"
    /></a>
    <a href="https://github.com/yjp20"
    ><img
            src="https://avatars3.githubusercontent.com/u/44457064?s=460&u=a55119c84e0167f6a3f830dbad3133b28f0c0a8f&v=4"
            width="45"
            height="45"
    /></a>
    <a href="https://github.com/samantha-wong"
    ><img
            src="https://avatars.githubusercontent.com/u/19571028?s=460&u=7421a02f600646b5836d5973359a257950cae8c4&v=4"
            width="45"
            height="45"
    /></a>
    <a href="https://github.com/msc-insure"
    ><img
            src="https://avatars.githubusercontent.com/u/44406870?s=200&v=4"
            width="45"
            height="45"
    /></a>
    <a href="https://github.com/ccheney"
    ><img
            src="https://avatars.githubusercontent.com/u/302437?v=4"
            width="45"
            height="45"
    /></a>
    <a href="https://github.com/artischockee"
    ><img
            src="https://avatars.githubusercontent.com/u/22125223?v=4"
            width="45"
            height="45"
    /></a>
    <a href="https://github.com/tsongas"
    ><img
            src="https://avatars.githubusercontent.com/u/2079598?v=4"
            width="45"
            height="45"
    /></a>
    <a href="https://github.com/knoefel"
    ><img
            src="https://avatars.githubusercontent.com/u/2396344?v=4"
            width="45"
            height="45"
    /></a>
    <a href="https://github.com/JGibel"
    ><img
            src="https://avatars.githubusercontent.com/u/1953965?v=4"
            width="45"
            height="45"
    /></a>
    <a href="https://github.com/gpalrepo"
    ><img
            src="https://avatars.githubusercontent.com/u/41862257?v=4"
            width="45"
            height="45"
    /></a>
    <a href="https://github.com/pjsachdev"
    ><img
            src="https://avatars.githubusercontent.com/u/43356139?v=4"
            width="45"
            height="45"
    /></a>
    <a href="https://github.com/svict4"
    ><img
            src="https://avatars.githubusercontent.com/u/1137112?v=4"
            width="45"
            height="45"
    /></a>
    <a href="https://github.com/raisiqueira"
    ><img
            src="https://avatars.githubusercontent.com/u/2914170?v=4"
            width="45"
            height="45"
    /></a>
    <a href="https://github.com/pashtet422"
    ><img
            src="https://avatars.githubusercontent.com/u/45594821?v=4"
            width="45"
            height="45"
    /></a>
    <a href="https://github.com/ozywuli"
    ><img
            src="https://avatars.githubusercontent.com/u/5769153?v=4"
            width="45"
            height="45"
    /></a>
    <a href="https://github.com/monkey0722"
    ><img
            src="https://avatars.githubusercontent.com/u/12868063?v=4"
            width="45"
            height="45"
    /></a>
    <a href="https://github.com/KATT"
    ><img
            src="https://avatars.githubusercontent.com/u/459267?v=4"
            width="45"
            height="45"
    /></a>
    <a href="https://github.com/jeroenvisser101"
    ><img
            src="https://avatars.githubusercontent.com/u/1941348?v=4"
            width="45"
            height="45"
    /></a>
    <a href="https://github.com/sainu"
    ><img
            src="https://avatars.githubusercontent.com/u/12888685?v=4"
            width="45"
            height="45"
    /></a>
    <a href="https://github.com/bkincart"
    ><img
            src="https://avatars.githubusercontent.com/u/22803185?v=4"
            width="45"
            height="45"
    /></a>
    <a href="https://github.com/37108"
    ><img
            src="https://avatars.githubusercontent.com/u/36793907?v=4"
            width="45"
            height="45"
    /></a>
    <a href="https://github.com/TadejPolajnar"
    ><img
            src="https://avatars.githubusercontent.com/u/40028548?v=4"
            width="45"
            height="45"
    /></a>
    <a href="https://github.com/hahnlee"
    ><img
            src="https://avatars.githubusercontent.com/u/16930958?v=4"
            width="45"
            height="45"
    /></a>
    <a href="https://github.com/ACPK"
    ><img
            src="https://avatars.githubusercontent.com/u/2019893?v=4"
            width="45"
            height="45"
    /></a>
    <a href="https://github.com/alex-semenyuk"
    ><img
            src="https://avatars.githubusercontent.com/u/5480441?v=4"
            width="45"
            height="45"
    /></a>
    <a href="https://github.com/Peter-AMD"
    ><img
            src="https://avatars.githubusercontent.com/u/28400709?v=4"
            width="45"
            height="45"
    /></a>
    <a href="https://github.com/hjaber"
    ><img
            src="https://avatars.githubusercontent.com/u/41503068?v=4"
            width="45"
            height="45"
    /></a>
    <a href="https://github.com/jprosevear"
    ><img
            src="https://avatars.githubusercontent.com/u/699616?v=4"
            width="45"
            height="45"
    /></a>
</p>

## Contributors

This project exists thanks to all the people who contribute. [[Contribute](CONTRIBUTING.md)].
<a href="https://github.com/bluebill1049/react-simple-animate/graphs/contributors"><img src="https://opencollective.com/react-simple-animate/contributors.svg?width=890&button=false" /></a>
