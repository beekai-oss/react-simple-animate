<div align="center">
  <a href="https://react-simple-animate.bluebill1049.dev/" title="React Simple Animate">
    <img src="https://raw.githubusercontent.com/bluebill1049/react-simple-animate-web-site/master/src/images/logo.svg" alt="React Simple Animate" width="180" />
  </a>
</div>

<p align="center">Simple React animations with components and hooks.</p>

<div align="center">

[![CI](https://github.com/bluebill1049/react-simple-animate/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/bluebill1049/react-simple-animate/actions/workflows/ci.yml)
[![npm downloads](https://img.shields.io/npm/dm/react-simple-animate.svg?style=for-the-badge)](https://www.npmjs.com/package/react-simple-animate)
[![npm](https://img.shields.io/npm/dt/react-simple-animate.svg?style=for-the-badge)](https://www.npmjs.com/package/react-simple-animate)
[![License](https://img.shields.io/npm/l/react-simple-animate?style=for-the-badge)](https://github.com/bluebill1049/react-simple-animate/blob/master/LICENSE)

</div>

<p align="center">
  <a href="https://react-simple-animate.bluebill1049.dev/">Get started</a> |
  <a href="https://react-simple-animate.bluebill1049.dev/animate">Animate</a> |
  <a href="https://react-simple-animate.bluebill1049.dev/animate-keyframes">Keyframes</a> |
  <a href="https://react-simple-animate.bluebill1049.dev/animate-group">Groups</a> |
  <a href="https://react-simple-animate.bluebill1049.dev/hooks">Hooks</a> |
  <a href="https://github.com/bluebill1049/react-simple-animate/tree/master/example">Examples</a>
</p>

### Features

- Animate with [CSS transitions](https://react-simple-animate.bluebill1049.dev/animate) or [keyframes](https://react-simple-animate.bluebill1049.dev/animate-keyframes)
- Sequence animations with [AnimateGroup](https://react-simple-animate.bluebill1049.dev/animate-group)
- Control animations with [hooks](https://react-simple-animate.bluebill1049.dev/hooks)
- Small package with [no runtime dependencies](./package.json)

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

See the [documentation](https://react-simple-animate.bluebill1049.dev/) for API details and more examples.
