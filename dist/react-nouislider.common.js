'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _nouisliderAlgoliaFork = require('nouislider-algolia-fork');

var _nouisliderAlgoliaFork2 = _interopRequireDefault(_nouisliderAlgoliaFork);

var Nouislider = (function (_React$Component) {
  _inherits(Nouislider, _React$Component);

  function Nouislider() {
    _classCallCheck(this, Nouislider);

    _get(Object.getPrototypeOf(Nouislider.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Nouislider, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.disabled) this.sliderContainer.setAttribute('disabled', true);else this.sliderContainer.removeAttribute('disabled');
      this.createSlider();
      this.keyDownRate = 10;
      this.lastKeyDown = new Date();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.disabled) this.sliderContainer.setAttribute('disabled', true);else this.sliderContainer.removeAttribute('disabled');
      // this.slider.destroy();
      // this.createSlider();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.slider.destroy();
    }

    // shouldComponentUpdate(nextProps) {
    //   return !nextProps.disabled;
    // }

  }, {
    key: 'onFocus',
    value: function onFocus(handle) {
      var _this = this;

      var handles = this.slider.target.querySelectorAll('.noUi-handle');
      handles[handle].addEventListener('keydown', function (event) {
        var keyDownTime = new Date();
        if ((keyDownTime - _this.lastKeyDown) / 1000 > 1 / _this.props.keyDownRate) {
          _this.props.onKeyDown(_this.slider, handle, event);
          _this.lastKeyDown = keyDownTime;
        }
      }, false);
      handles[handle].addEventListener('blur', function () {
        return _this.removeListeners(handles[handle]);
      }, false);
    }
  }, {
    key: 'onUpdate',
    value: function onUpdate(values, handle, unencoded, tap, positions) {
      this.slider.handles[handle].setAttribute('aria-valuenow', this.slider.get());
      this.props.onUpdate(values, handle, unencoded, tap, positions);
    }
  }, {
    key: 'removeListeners',
    value: function removeListeners(handle) {
      handle.removeEventListener('keydown', this.props.onKeyDown);
      handle.removeEventListener('blur', this.removeListeners);
    }
  }, {
    key: 'createSlider',
    value: function createSlider() {
      var _this2 = this;

      this.slider = _nouisliderAlgoliaFork2['default'].create(this.sliderContainer, _extends({}, this.props));
      this.slider.handles = this.slider.target.querySelectorAll('.noUi-handle');
      this.slider.baseTrackBackgrounds = this.slider.target.querySelectorAll('.noUi-origin');

      var handleCount = this.slider.handles.length;

      if (handleCount > 1) {
        this.props.classNameTrackContrast.forEach(function (item) {
          _this2.sliderContainer.classList.add(item);
        });
        this.props.classNameTrack.forEach(function (item) {
          _this2.slider.baseTrackBackgrounds[0].classList.add(item);
        });
      } else {
        this.props.classNameTrack.forEach(function (item) {
          _this2.sliderContainer.classList.add(item);
        });
      }

      this.props.classNameTrackContrast.forEach(function (item) {
        _this2.slider.baseTrackBackgrounds[handleCount - 1].classList.add(item);
      });

      if (this.props.onUpdate) {
        this.slider.on('update', function (values, handle, unencoded, tap, positions) {
          return _this2.onUpdate(values, handle, unencoded, tap, positions);
        });
      }

      if (this.props.onChange) {
        this.slider.on('change', this.props.onChange);
      }

      if (this.props.onSlide) {
        this.slider.on('slide', this.props.onSlide);
      }

      [].forEach.call(this.slider.handles, function (handle, index) {
        _this2.props.classNameHandle.forEach(function (item) {
          handle.classList.add(item);
        });
        if (_this2.props.tabIndex > -1) {
          handle.setAttribute('tabindex', _this2.props.tabIndex);
          handle.addEventListener('focus', function () {
            return _this2.onFocus(index);
          });

          handle.addEventListener('click', function (event) {
            event.target.focus();
          });

          handle.setAttribute('role', 'slider');
          handle.setAttribute('aria-valuemin', _this2.props.range.min);
          handle.setAttribute('aria-valuemax', _this2.props.range.max);
          handle.setAttribute('aria-valuenow', _this2.slider.get());
          handle.setAttribute('aria-labelledby', _this2.props.ariaLabelledby);
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2['default'].createElement('div', { ref: function (slider) {
          _this3.sliderContainer = slider;
        } });
    }
  }]);

  return Nouislider;
})(_react2['default'].Component);

Nouislider.propTypes = {
  // http://refreshless.com/nouislider/slider-options/#section-animate
  animate: _react2['default'].PropTypes.bool,
  // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-labelledby_attribute
  ariaLabelledby: _react2['default'].PropTypes.string,
  // http://refreshless.com/nouislider/behaviour-option/
  behaviour: _react2['default'].PropTypes.string,
  classNameHandle: _react2['default'].PropTypes.array,
  classNameTrack: _react2['default'].PropTypes.array,
  classNameTrackContrast: _react2['default'].PropTypes.array,
  // http://refreshless.com/nouislider/slider-options/#section-Connect
  connect: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.oneOf(['lower', 'upper']), _react2['default'].PropTypes.bool]),
  // http://refreshless.com/nouislider/slider-options/#section-cssPrefix
  cssPrefix: _react2['default'].PropTypes.string,
  // http://refreshless.com/nouislider/slider-options/#section-orientation
  direction: _react2['default'].PropTypes.oneOf(['ltr', 'rtl']),
  // http://refreshless.com/nouislider/more/#section-disable
  disabled: _react2['default'].PropTypes.bool,
  keyDownRate: _react2['default'].PropTypes.number,
  // http://refreshless.com/nouislider/slider-options/#section-limit
  limit: _react2['default'].PropTypes.number,
  // http://refreshless.com/nouislider/slider-options/#section-margin
  margin: _react2['default'].PropTypes.number,
  // http://refreshless.com/nouislider/events-callbacks/#section-change
  onChange: _react2['default'].PropTypes.func,
  // https://refreshless.com/nouislider/examples/#section-keyboard
  onKeyDown: _react2['default'].PropTypes.func,
  // http://refreshless.com/nouislider/events-callbacks/#section-update
  onSlide: _react2['default'].PropTypes.func,
  // http://refreshless.com/nouislider/events-callbacks/#section-slide
  onUpdate: _react2['default'].PropTypes.func,
  // http://refreshless.com/nouislider/slider-options/#section-orientation
  orientation: _react2['default'].PropTypes.oneOf(['horizontal', 'vertical']),
  // http://refreshless.com/nouislider/pips/
  pips: _react2['default'].PropTypes.object,
  // http://refreshless.com/nouislider/slider-values/#section-range
  range: _react2['default'].PropTypes.object.isRequired,
  // http://refreshless.com/nouislider/slider-options/#section-start
  start: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.number).isRequired,
  // http://refreshless.com/nouislider/slider-options/#section-step
  step: _react2['default'].PropTypes.number,
  // https://refreshless.com/nouislider/examples/#section-keyboard
  tabIndex: _react2['default'].PropTypes.number,
  // http://refreshless.com/nouislider/slider-options/#section-tooltips
  tooltips: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.bool, _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.shape({
    to: _react2['default'].PropTypes.func
  }))])
};

Nouislider.defaultProps = {
  classNameTrack: ['noUi-bg-alt-current'],
  classNameTrackContrast: ['noUi-bg-contrast-current'],
  classNameHandle: ['noUi-pseudo-bg-current', 'noUi-pseudo-border-current'],
  keyDownRate: 100,
  onKeyDown: function onKeyDown(slider, handle, e) {
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
