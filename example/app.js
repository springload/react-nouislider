import React from 'react';
import ReactDOM from 'react-dom';

import Nouislider from '../index.js';

function handleKeydown(slider, handle, e) {
  // console.log("slider", slider);
  // console.log("handle", handle);

  var value = slider.get();
  var newValue;

  if (value instanceof Array) {
    newValue = Number(value[handle]);
  } else {
    newValue = Number(value);
  }

  switch (e.which) {
    case 37:
      newValue = newValue - 10;
      break;
    case 39:
      newValue = newValue + 10;
      break;
    default:
      break;
  }

  if (value instanceof Array) {
    value[handle] = newValue;
  } else {
    value = newValue;
  }

  slider.set(value, e);
}

function removeListeners(handle) {
  handle.removeEventListener('keydown', handleKeydown);
  handle.removeEventListener('blur', removeListeners);
}

function handleFocus(slider, handle) {
  var handles = slider.target.querySelectorAll('.noUi-handle');
  handles[handle].addEventListener('keydown', (event) => handleKeydown(slider, handle, event), false);
  handles[handle].addEventListener('blur', (event) => removeListeners(handles[handle]), false);
}

function handleChange(value) {
  console.log('handleChange', value);
}

function handleUpdate(value) {
  console.log('handleUpdate', value);
}

ReactDOM.render(
  <Nouislider
    onUpdate={handleUpdate}
    onChange={handleChange}
    onFocus={handleFocus}
    pips={{
      mode: 'range',
      density: 3
    }}
    range={{min: 0, max: 200}}
    start={[0, 100]}
    ariaLabelledby="slider"
    tabIndex={0}
    tooltips
  />, document.querySelector('#container')
);
