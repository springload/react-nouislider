import React from 'react';
import ReactDOM from 'react-dom';

import Nouislider from '../index.js';

ReactDOM.render(
  <Nouislider
    onKeyDown={function(slider, idx, e) {
      var value = Number(slider.get()[idx]);

      switch (e.which) {
      case 37:
        // --------------------------------------------------
        // THIS IS NOT WORKING BECAUSE OF MULTIPLE HANDLES...
        // --------------------------------------------------
        // We need to find a way to say a handle value when multiple.
        slider.set(value - 10, e);
        break;
      case 39:
        slider.set(value + 10, e);
        break;
      default:
        break;
      }
    }}
    pips={{
      mode: 'range',
      density: 3
    }}
    range={{min: 0, max: 200}}
    start={[0, 100]}
    tabIndex={0}
    tooltips
  />, document.querySelector('#container')
);
