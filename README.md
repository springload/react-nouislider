# @springload/react-nouislider

> :warning: Fork of [react-nouislider](https://github.com/algolia/react-nouislider), itself using a fork of [leongersen/noUiSlider](https://github.com/leongersen/noUiSlider) to allow setting ranges dynamically and other fixes to be merged in upstream project.

**Use at your own risks.**

```sh
npm install --save @springload/react-nouislider
```

## Usage

In your stylesheets,

```css
@import '../../../node_modules/@springload/react-nouislider/dist/nouislider.css';
```

In your JS,

```js
import React from 'react';
import ReactDOM from 'react-dom';

import Nouislider from '@springload/react-nouislider';

ReactDOM.render(
  <Nouislider
    range={{min: 0, max: 200}}
    start={[0, 100]}
    tooltips
  />, document.querySelector('#container')
);
```

## Development workflow

```sh
npm install
npm run dev
```
