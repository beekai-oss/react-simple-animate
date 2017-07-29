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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Animate.__proto__ || Object.getPrototypeOf(Animate)).call.apply(_ref, [this].concat(args))), _this), _this.state = defaultState, _this.animationTimeout = null, _this.setAnimationDelay = function (condition, stateName, duration) {
      if (!condition) return;
      clearTimeout(_this.animationTimeout);
      _this.animationTimeout = setTimeout(function () {
        _this.setState(_defineProperty({}, stateName, true));
      }, duration * 1000);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  // props: Props;

  _createClass(Animate, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.animationTimeout);
      this.animationTimeout = null;
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      // only situation that should trigger a re-render
      return nextProps.startAnimation !== this.props.startAnimation || nextState.animationWillEnd !== this.state.animationWillEnd || nextState.delayWillEnd !== this.state.delayWillEnd || nextProps.reverseAnimation !== this.props.reverseAnimation || !!nextProps.forceUpdate;
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

      this.setAnimationDelay(!!delaySeconds && startAnimation, 'delayWillEnd', delaySeconds);
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          animationWillEnd = _state.animationWillEnd,
          delayWillEnd = _state.delayWillEnd;
      var _props2 = this.props,
          children = _props2.children,
          startAnimation = _props2.startAnimation,
          startStyle = _props2.startStyle,
          endStyle = _props2.endStyle,
          onCompleteStyle = _props2.onCompleteStyle,
          durationSeconds = _props2.durationSeconds,
          delaySeconds = _props2.delaySeconds,
          easeType = _props2.easeType,
          reverseAnimation = _props2.reverseAnimation;

      var style = startStyle;

      if (animationWillEnd) {
        style = onCompleteStyle;
      } else if (startAnimation && !delaySeconds || delaySeconds && delayWillEnd) {
        style = reverseAnimation ? startStyle : endStyle;
      }

      return _react2.default.createElement(
        'div',
        {
          style: _extends(_extends({}, style, {
            transition: durationSeconds + 's all ' + easeType
          }))
        },
        children
      );
    }
  }]);

  return Animate;
}(_react2.default.Component);

Animate.defaultProps = {
  delaySeconds: 0,
  easeType: 'linear'
};
exports.default = Animate;