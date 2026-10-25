<div align="center">
  <a href="https://react-simple-animate.bluebill1049.dev/" title="React Simple Animate">
    <img src="https://raw.githubusercontent.com/bluebill1049/react-simple-animate-web-site/master/src/images/logo.svg" alt="React Simple Animate" width="180" />
  </a>
</div>

<div align="center">

[![npm downloads](https://img.shields.io/npm/dm/react-simple-animate.svg?style=for-the-badge)](https://www.npmjs.com/package/react-simple-animate)
[![npm](https://img.shields.io/npm/dt/react-simple-animate.svg?style=for-the-badge)](https://www.npmjs.com/package/react-simple-animate)
[![License](https://img.shields.io/npm/l/react-simple-animate?style=for-the-badge)](https://github.com/bluebill1049/react-simple-animate/blob/master/LICENSE)

</div>

<p align="center">
  <a href="https://react-simple-animate.bluebill1049.dev/">Docs</a> |
  <a href="https://react-simple-animate.bluebill1049.dev/animate">Animate</a> |
  <a href="https://react-simple-animate.bluebill1049.dev/animate-keyframes">Keyframes</a> |
  <a href="https://react-simple-animate.bluebill1049.dev/animate-group">Groups</a> |
  <a href="https://react-simple-animate.bluebill1049.dev/hooks">Hooks</a>
</p>

### Features

- Animate React components with CSS transitions or keyframes
- Sequence animations with `AnimateGroup`
- Use hooks for custom animation control
- Small package with no runtime dependencies

### Install

```sh
npm install react-simple-animate
```

### Quickstart

```jsx
import { Animate } from 'react-simple-animate';

function App() {
  return (
    <Animate play start={{ opacity: 0 }} end={{ opacity: 1 }}>
      <h1>Hello, animation!</h1>
    </Animate>
  );
}
```

`Animate`, `useAnimate`, and transition entries in `useAnimateGroup` accept a
`transitionProperty` option. It defaults to `all`; set it to a CSS property or
comma-separated properties to limit what transitions, for example:

```jsx
<Animate
  play
  start={{ opacity: 0 }}
  end={{ opacity: 1, transform: 'translateY(0)' }}
  transitionProperty="opacity, transform"
>
  <h1>Hello, animation!</h1>
</Animate>
```
