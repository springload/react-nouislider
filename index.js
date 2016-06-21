import React from 'react';
import nouislider from 'nouislider-algolia-fork';

class Nouislider extends React.Component {
  componentDidMount() {
    if (this.props.disabled) this.sliderContainer.setAttribute('disabled', true);
    else this.sliderContainer.removeAttribute('disabled');
    this.createSlider();
    this.keyDownRate = 10;
    this.lastKeyDown = new Date();
  }

  componentDidUpdate() {
    if (this.props.disabled) this.sliderContainer.setAttribute('disabled', true);
    else this.sliderContainer.removeAttribute('disabled');
    this.slider.destroy();
    this.createSlider();
  }

  componentWillUnmount() {
    this.slider.destroy();
  }

  onFocus(handle) {
    var handles = this.slider.target.querySelectorAll('.noUi-handle');
    handles[handle].addEventListener('keydown', (event) => {
      var keyDownTime = new Date();
      if ((keyDownTime - this.lastKeyDown) / 1000 > 1 / this.props.keyDownRate) {
        this.props.onKeyDown(this.slider, handle, event);
        this.lastKeyDown = keyDownTime;
      }
    },
      false);
    handles[handle].addEventListener('blur', () => this.removeListeners(handles[handle]), false);
  }

  onUpdate(values, handle, unencoded, tap, positions) {
    this.slider.handles[handle].setAttribute('aria-valuenow', this.slider.get());
    this.props.onUpdate(values, handle, unencoded, tap, positions);
  }

  removeListeners(handle) {
    handle.removeEventListener('keydown', this.props.onKeyDown);
    handle.removeEventListener('blur', this.removeListeners);
  }

  createSlider() {
    console.log('debug');
    this.slider = nouislider.create(this.sliderContainer, {...this.props});
    this.slider.handles = this.slider.target.querySelectorAll('.noUi-handle');
    this.slider.baseTrackBackgrounds = this.slider.target.querySelectorAll('.noUi-origin');

    var handleCount = this.slider.handles.length;
    if (this.sliderContainer.className.indexOf(this.props.classNameTrack) === -1 &&
      this.sliderContainer.className.indexOf(this.props.classNameTrackContrast) === -1) {
      this.sliderContainer.className +=
        (handleCount > 1) ? ` ${this.props.classNameTrackContrast}` : ` ${this.props.classNameTrack}`;
    }
    if (this.slider.baseTrackBackgrounds[0].className.indexOf(this.props.classNameTrack) === -1) {
      this.slider.baseTrackBackgrounds[0].className += (handleCount > 1) ? ` ${this.props.classNameTrack}` : '';
    }
    if (this.slider.baseTrackBackgrounds[0].className.indexOf(this.props.classNameTrackContrast) === -1) {
      this.slider.baseTrackBackgrounds[handleCount - 1].className += ` ${this.props.classNameTrackContrast}`;
    }

    if (this.props.onUpdate) {
      this.slider.on('update', (values, handle, unencoded, tap, positions) =>
        this.onUpdate(values, handle, unencoded, tap, positions));
    }

    if (this.props.onChange) {
      this.slider.on('change', this.props.onChange);
    }

    if (this.props.onSlide) {
      this.slider.on('slide', this.props.onSlide);
    }

    [].forEach.call(this.slider.handles, (handle, index) => {
      handle.className += ` ${this.props.classNameHandle}`;
      if (this.props.tabIndex > -1) {
        handle.setAttribute('tabindex', this.props.tabIndex);
        handle.addEventListener('focus', () => this.onFocus(index));

        handle.addEventListener('click', (event) => {
          event.target.focus();
        });

        handle.setAttribute('role', 'slider');
        handle.setAttribute('aria-valuemin', this.props.range.min);
        handle.setAttribute('aria-valuemax', this.props.range.max);
        handle.setAttribute('aria-valuenow', this.slider.get());
        handle.setAttribute('aria-labelledby', this.props.ariaLabelledby);
      }
    });
  }

  render() {
    return <div ref={slider => {this.sliderContainer = slider;}} />;
  }
}

Nouislider.propTypes = {
  // http://refreshless.com/nouislider/slider-options/#section-animate
  animate: React.PropTypes.bool,
  // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-labelledby_attribute
  ariaLabelledby: React.PropTypes.string,
  // http://refreshless.com/nouislider/behaviour-option/
  behaviour: React.PropTypes.string,
  classNameHandle: React.PropTypes.string,
  classNameTrack: React.PropTypes.string,
  classNameTrackContrast: React.PropTypes.string,
  // http://refreshless.com/nouislider/slider-options/#section-Connect
  connect: React.PropTypes.oneOfType([
    React.PropTypes.oneOf(['lower', 'upper']),
    React.PropTypes.bool
  ]),
  // http://refreshless.com/nouislider/slider-options/#section-cssPrefix
  cssPrefix: React.PropTypes.string,
  // http://refreshless.com/nouislider/slider-options/#section-orientation
  direction: React.PropTypes.oneOf(['ltr', 'rtl']),
  // http://refreshless.com/nouislider/more/#section-disable
  disabled: React.PropTypes.bool,
  keyDownRate: React.PropTypes.number,
  // http://refreshless.com/nouislider/slider-options/#section-limit
  limit: React.PropTypes.number,
  // http://refreshless.com/nouislider/slider-options/#section-margin
  margin: React.PropTypes.number,
  // http://refreshless.com/nouislider/events-callbacks/#section-change
  onChange: React.PropTypes.func,
  // https://refreshless.com/nouislider/examples/#section-keyboard
  onKeyDown: React.PropTypes.func,
  // http://refreshless.com/nouislider/events-callbacks/#section-update
  onSlide: React.PropTypes.func,
  // http://refreshless.com/nouislider/events-callbacks/#section-slide
  onUpdate: React.PropTypes.func,
  // http://refreshless.com/nouislider/slider-options/#section-orientation
  orientation: React.PropTypes.oneOf(['horizontal', 'vertical']),
  // http://refreshless.com/nouislider/pips/
  pips: React.PropTypes.object,
  // http://refreshless.com/nouislider/slider-values/#section-range
  range: React.PropTypes.object.isRequired,
  // http://refreshless.com/nouislider/slider-options/#section-start
  start: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
  // http://refreshless.com/nouislider/slider-options/#section-step
  step: React.PropTypes.number,
  // https://refreshless.com/nouislider/examples/#section-keyboard
  tabIndex: React.PropTypes.number,
  // http://refreshless.com/nouislider/slider-options/#section-tooltips
  tooltips: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.arrayOf(
      React.PropTypes.shape({
        to: React.PropTypes.func
      })
    )
  ])
};

Nouislider.defaultProps = {
  classNameTrack: 'noUi-bg-alt-current',
  classNameTrackContrast: 'noUi-bg-contrast-current',
  classNameHandle: 'noUi-pseudo-bg-current noUi-pseudo-border-current',
  keyDownRate: 100,
  onKeyDown: (slider, handle, e) => {
    var value = slider.get();
    var newValue;

    if (value instanceof Array) {
      newValue = Number(value[handle]);
    } else {
      newValue = Number(value);
    }

    switch (e.which) {
    case 37:
    case 40:
      newValue = newValue - 10;
      break;
    case 39:
    case 38:
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
  },
  ariaLabelledby: 'sliderLabel'
};

module.exports = Nouislider;
