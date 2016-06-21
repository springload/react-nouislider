import React from 'react';
import ReactDOM from 'react-dom';

import Nouislider from '../index.js';

class SliderWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false
    };
  }

  handleChange(value) {
    console.log('handleChange', value);
  }

  handleUpdate(value) {
    console.log('handleUpdate', value);
  }

  handleDisable(that) {
    console.log(that)
    that.setState({
      disabled: !that.state.disabled
    });
  }

  render() {
    return (
      <div>
        <div id="container">
          <Nouislider
            ariaLabelledby="sliderLabel"
            onChange={this.handleChange}
            onUpdate={this.handleUpdate}
            pips={{
              mode: 'range',
              density: 3
            }}
            range={{min: 0, max: 200}}
            start={[0, 100]}
            tabIndex={0}
            tooltips
          />
        </div>

        <div id="container2">
          <Nouislider
            ariaLabelledby="sliderLabel"
            keyDownRate={10}
            onChange={this.handleChange}
            onUpdate={this.handleUpdate}
            pips={{
              mode: 'range',
              density: 3
            }}
            range={{min: 0, max: 200}}
            start={[0]}
            tabIndex={0}
            tooltips
            disabled={this.state.disabled}
          />
        </div>

        <div>
          <label>
            <input onChange={(evt) => this.handleDisable(this)} type="checkbox" /> Disable
          </label>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <SliderWrapper />, document.querySelector('#slider-wrapper')
);
