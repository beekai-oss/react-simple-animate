'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultState = {
  animationWillEnd: false,
  delayWillEnd: false
};

var Animate = function (_React$Component) {
  _inherits(Animate, _React$Component);

  function Animate() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Animate);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Animate.__proto__ || Object.getPrototypeOf(Animate)).call.apply(_ref, [this].concat(args))), _this), _this.state = defaultState, _this.animationTimeout = null, _this.animationCompleteTimeout = null, _this.setAnimationDelay = function (condition, stateName, durationSeconds) {
      if (!condition) return;
      clearTimeout(_this.animationTimeout);
      _this.animationTimeout = setTimeout(function () {
        _this.setState(_defineProperty({}, stateName, true));
      }, parseFloat(durationSeconds) * 1000);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Animate, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.animationTimeout);
      clearTimeout(this.animationCompleteTimeout);
      this.animationTimeout = null;
      this.animationCompleteTimeout = null;
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      // only situation that should trigger a re-render
      return JSON.stringify(nextProps.startStyle) !== JSON.stringify(this.props.startStyle) || JSON.stringify(nextProps.endStyle) !== JSON.stringify(this.props.endStyle) || nextProps.startAnimation !== this.props.startAnimation || nextProps.children !== this.props.children || nextState.animationWillEnd !== this.state.animationWillEnd || nextState.delayWillEnd !== this.state.delayWillEnd || !!nextProps.forceUpdate;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var durationSeconds = nextProps.durationSeconds,
          startAnimation = nextProps.startAnimation,
          onCompleteStyle = nextProps.onCompleteStyle,
          delaySeconds = nextProps.delaySeconds;


      if (delaySeconds) {
        this.setAnimationDelay(!!delaySeconds && startAnimation, 'animationWillEnd', delaySeconds);
      } else if (onCompleteStyle) {
        this.setAnimationDelay(!!onCompleteStyle && startAnimation, 'animationWillEnd', durationSeconds);
      }

      if (startAnimation !== this.props.startAnimation) {
        this.setState(defaultState);
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          delaySeconds = _props.delaySeconds,
          startAnimation = _props.startAnimation;


      this.animationCompleteTimeout = this.setAnimationDelay(!!delaySeconds && startAnimation, 'delayWillEnd', delaySeconds);
    }
  }, {
    key: 'onComplete',
    value: function onComplete() {
      var _this2 = this;

      var _props2 = this.props,
          delaySeconds = _props2.delaySeconds,
          durationSeconds = _props2.durationSeconds;


      this.animationCompleteTimeout = setTimeout(function () {
        _this2.props.onComplete();
      }, (parseFloat(delaySeconds) + parseFloat(durationSeconds)) * 1000);
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          animationWillEnd = _state.animationWillEnd,
          delayWillEnd = _state.delayWillEnd;
      var _props3 = this.props,
          children = _props3.children,
          startAnimation = _props3.startAnimation,
          startStyle = _props3.startStyle,
          endStyle = _props3.endStyle,
          onCompleteStyle = _props3.onCompleteStyle,
          durationSeconds = _props3.durationSeconds,
          delaySeconds = _props3.delaySeconds,
          easeType = _props3.easeType,
          onComplete = _props3.onComplete,
          className = _props3.className,
          transition = _props3.transition;

      var style = startStyle;

      if (animationWillEnd) {
        style = onCompleteStyle ? onCompleteStyle : endStyle;
        if (onComplete) this.onComplete();
      } else if (startAnimation && !delaySeconds || delaySeconds && delayWillEnd) {
        style = endStyle;
        if (onComplete) this.onComplete();
      }

      return _react2.default.createElement(
        'div',
        {
          className: className,
          style: _extends(_extends({}, style, {
            transition: transition || durationSeconds + 's all ' + easeType
          }))
        },
        children
      );
    }
  }]);

  return Animate;
}(_react2.default.Component);

Animate.defaultProps = {
  durationSeconds: 0.3,
  delaySeconds: 0,
  easeType: 'linear'
};
exports.default = Animate;