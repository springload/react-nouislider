import React from 'react';
import ReactDOM from 'react-dom';

import Nouislider from '../index.js';

function handleChange(value) {
  console.log('handleChange', value);
}

function handleUpdate(value) {
  console.log('handleUpdate', value);
}

ReactDOM.render(
  <Nouislider
    ariaLabelledby="slider"
    onChange={handleChange}
    onUpdate={handleUpdate}
    pips={{
      mode: 'range',
      density: 3
    }}
    range={{min: 0, max: 200}}
    start={[0]}
    tooltips
  />, document.querySelector('#container')
);
