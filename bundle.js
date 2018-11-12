'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

// 
var mapSequenceOverProps = (function (props, id) {
  var animationStates = props.animationStates,
      restProps = _objectWithoutProperties(props, ["animationStates"]);

  if (!id || !animationStates || !animationStates[id]) return props;

  var stateCopy = _objectSpread({}, animationStates[id]);

  return _objectSpread({}, stateCopy, restProps);
});

function attributesGenerator(props, _ref, isMountWithPlay) {
  var willComplete = _ref.willComplete,
      shouldMount = _ref.shouldMount;
  var animationStates = props.animationStates,
      sequenceId = props.sequenceId,
      sequenceIndex = props.sequenceIndex;
  var id = sequenceId || sequenceIndex;

  var _mapSequenceOverProps = mapSequenceOverProps(props, id),
      play = _mapSequenceOverProps.play,
      startStyle = _mapSequenceOverProps.startStyle,
      endStyle = _mapSequenceOverProps.endStyle,
      onCompleteStyle = _mapSequenceOverProps.onCompleteStyle,
      _mapSequenceOverProps2 = _mapSequenceOverProps.durationSeconds,
      durationSeconds = _mapSequenceOverProps2 === void 0 ? 0.3 : _mapSequenceOverProps2,
      _mapSequenceOverProps3 = _mapSequenceOverProps.delaySeconds,
      delaySeconds = _mapSequenceOverProps3 === void 0 ? 0 : _mapSequenceOverProps3,
      _mapSequenceOverProps4 = _mapSequenceOverProps.easeType,
      easeType = _mapSequenceOverProps4 === void 0 ? 'linear' : _mapSequenceOverProps4,
      className = _mapSequenceOverProps.className,
      _mapSequenceOverProps5 = _mapSequenceOverProps.reverseDurationSeconds,
      reverseDurationSeconds = _mapSequenceOverProps5 === void 0 ? 0 : _mapSequenceOverProps5,
      _mapSequenceOverProps6 = _mapSequenceOverProps.reverseDelaySeconds,
      reverseDelaySeconds = _mapSequenceOverProps6 === void 0 ? 0 : _mapSequenceOverProps6,
      unMount = _mapSequenceOverProps.unMount,
      mount = _mapSequenceOverProps.mount,
      forwardedRef = _mapSequenceOverProps.forwardedRef;

  var style = startStyle;
  var transition = "all ".concat(durationSeconds, "s ").concat(easeType, " ").concat(delaySeconds, "s");
  var willMountOrUnMount = unMount || mount && !shouldMount;

  if (!play && (reverseDurationSeconds || reverseDelaySeconds)) {
    transition = "all ".concat(reverseDurationSeconds || durationSeconds, "s ").concat(easeType, " ").concat(reverseDelaySeconds, "s");
  } else if (!willMountOrUnMount && !isMountWithPlay) {
    if (willComplete && onCompleteStyle && play) {
      style = onCompleteStyle;
      transition = '';
    } else if (mount || play || (id || id === 0) && Object.keys(animationStates).length && animationStates[id] && animationStates[id].play) {
      style = endStyle;
    }
  }

  return {
    className: className,
    style: _objectSpread({}, style, {
      transition: transition
    }),
    ref: forwardedRef
  };
}

// 
var calculateTotalDuration = (function (_ref) {
  var _ref$durationSeconds = _ref.durationSeconds,
      durationSeconds = _ref$durationSeconds === void 0 ? 0 : _ref$durationSeconds,
      _ref$delaySeconds = _ref.delaySeconds,
      delaySeconds = _ref$delaySeconds === void 0 ? 0 : _ref$delaySeconds,
      _ref$overlaySeconds = _ref.overlaySeconds,
      overlaySeconds = _ref$overlaySeconds === void 0 ? 0 : _ref$overlaySeconds,
      _ref$reverseDurationS = _ref.reverseDurationSeconds,
      reverseDurationSeconds = _ref$reverseDurationS === void 0 ? 0 : _ref$reverseDurationS,
      play = _ref.play;
  var duration = parseFloat(play ? durationSeconds : reverseDurationSeconds || durationSeconds) + parseFloat(delaySeconds);
  var withEarlySeconds = duration - parseFloat(overlaySeconds);
  return withEarlySeconds * 1000;
});

var AnimateContext = React.createContext({
  animationStates: {},
  register: undefined
});

var AnimateGroup =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(AnimateGroup, _React$PureComponent);

  function AnimateGroup() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AnimateGroup);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AnimateGroup)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      animationStates: {}
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "timers", {});

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "animations", {});

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setupAnimationTimers", function (_ref) {
      var totalDuration = _ref.totalDuration,
          id = _ref.id,
          restAttributes = _ref.restAttributes,
          play = _ref.play;
      _this.timers[id] = setTimeout(function () {
        _this.setState(function (previousState) {
          var stateCopy = _objectSpread({}, previousState.animationStates);

          if (!stateCopy[id]) stateCopy[id] = {};
          Object.entries(restAttributes).forEach(function (_ref2) {
            var _ref3 = _slicedToArray(_ref2, 2),
                key = _ref3[0],
                value = _ref3[1];

            stateCopy[id][key] = value;
          });
          stateCopy[id].play = play;
          return {
            animationStates: stateCopy
          };
        });
      }, totalDuration);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "calculateSequences", function () {
      var _this$props = _this.props,
          sequences = _this$props.sequences,
          reverseSequences = _this$props.reverseSequences,
          play = _this$props.play;
      var sequencesToAnimate = Array.isArray(sequences) && sequences.length ? sequences : Object.values(_this.animations);
      var reverseSequencesToAnimate = Array.isArray(reverseSequences) && reverseSequences.length ? reverseSequences : _toConsumableArray(sequencesToAnimate).reverse();
      return (play ? sequencesToAnimate : reverseSequencesToAnimate).reduce(function (previous, current, currentIndex) {
        var sequenceId = current.sequenceId,
            sequenceIndex = current.sequenceIndex,
            restAttributes = _objectWithoutProperties(current, ["sequenceId", "sequenceIndex"]);

        var id = sequenceId === undefined && sequenceIndex === undefined ? currentIndex : sequenceId || sequenceIndex;
        var totalDuration = previous + calculateTotalDuration(_objectSpread({}, _this.animations[id], {
          play: play,
          restAttributes: restAttributes
        }));

        _this.setupAnimationTimers({
          id: id,
          totalDuration: currentIndex === 0 ? 0 : previous,
          restAttributes: restAttributes,
          play: play
        });

        return totalDuration;
      }, 0);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "register", function (props) {
      var sequenceIndex = props.sequenceIndex,
          sequenceId = props.sequenceId;
      var id = sequenceId || sequenceIndex;
      if (id === undefined || sequenceIndex && sequenceIndex < 0 || sequenceId && sequenceId === '') return;
      _this.animations[id] = _objectSpread({}, props);
    });

    return _this;
  }

  _createClass(AnimateGroup, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.play && this.calculateSequences();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.play !== prevProps.play) this.calculateSequences();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      Object.values(this.timers).forEach(function (timer) {
        return clearTimeout(timer);
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(AnimateContext.Provider, {
        value: {
          animationStates: this.state.animationStates,
          register: this.register
        }
      }, this.props.children);
    }
  }]);

  return AnimateGroup;
}(React.PureComponent);

_defineProperty(AnimateGroup, "displayName", 'AnimateGroup');

_defineProperty(AnimateGroup, "defaultProps", {
  sequences: [],
  reverseSequences: []
});

var AnimateChild =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(AnimateChild, _React$PureComponent);

  function AnimateChild(props) {
    var _this;

    _classCallCheck(this, AnimateChild);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AnimateChild).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "isMountWithPlay", false);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      willComplete: false,
      play: false,
      shouldUnMount: false,
      shouldMount: false
    });

    if (props.play) {
      _this.isMountWithPlay = true;
      _this.initialPlayTimer = setTimeout(function () {
        _this.isMountWithPlay = false;

        _this.forceUpdate();
      }, (props.delaySeconds || 0) * 1000);
    }

    return _this;
  }

  _createClass(AnimateChild, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var _this$props = this.props,
          register = _this$props.register,
          mount = _this$props.mount;
      register && register(this.props);

      if (mount && !this.state.shouldMount) {
        this.mountTimeout = setTimeout(function () {
          return _this2.setState({
            shouldMount: true
          });
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this3 = this;

      var _this$props2 = this.props,
          durationSeconds = _this$props2.durationSeconds,
          unMount = _this$props2.unMount;
      this.onComplete();

      if (!prevProps.unMount && unMount) {
        this.unMountTimeout = setTimeout(function () {
          return _this3.setState({
            shouldUnMount: true
          });
        }, parseFloat(durationSeconds) * 1000);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearTimeout(this.completeTimeout);
      clearTimeout(this.unMountTimeout);
      clearTimeout(this.mountTimeout);
      clearTimeout(this.initialPlayTimer);
    }
  }, {
    key: "onComplete",
    value: function onComplete() {
      var _this4 = this;

      var _this$props3 = this.props,
          delaySeconds = _this$props3.delaySeconds,
          play = _this$props3.play,
          onCompleteStyle = _this$props3.onCompleteStyle,
          durationSeconds = _this$props3.durationSeconds,
          onComplete = _this$props3.onComplete,
          animationStates = _this$props3.animationStates,
          sequenceId = _this$props3.sequenceId,
          sequenceIndex = _this$props3.sequenceIndex;
      var id = sequenceId || sequenceIndex;

      if ((onComplete || onCompleteStyle) && !this.state.willComplete && (play || id && Object.keys(animationStates).length && animationStates[id] && animationStates[id].play)) {
        clearTimeout(this.completeTimeout);
        this.completeTimeout = setTimeout(function () {
          _this4.setState({
            willComplete: true
          });

          onComplete && onComplete();
        }, (parseFloat(delaySeconds) + parseFloat(durationSeconds)) * 1000);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          _this$props4$tag = _this$props4.tag,
          tag = _this$props4$tag === void 0 ? 'div' : _this$props4$tag,
          children = _this$props4.children,
          render = _this$props4.render;
      var shouldUnMount = this.state.shouldUnMount;
      if (shouldUnMount) return null;
      var props = attributesGenerator(this.props, this.state, this.isMountWithPlay);
      return render ? render(props) : React.createElement(tag, props, children);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var animationStates = nextProps.animationStates,
          play = nextProps.play,
          sequenceId = nextProps.sequenceId,
          sequenceIndex = nextProps.sequenceIndex,
          onCompleteStyle = nextProps.onCompleteStyle,
          mount = nextProps.mount;
      var id = sequenceId || sequenceIndex;
      var currentPlay = play;

      if (id !== undefined && animationStates && animationStates[id]) {
        var state = animationStates[id];
        currentPlay = state.play;
      }

      return _objectSpread({}, onCompleteStyle && prevState.willComplete ? {
        willComplete: !(play && !prevState.play && prevState.willComplete)
      } : null, currentPlay !== prevState.play ? {
        play: currentPlay
      } : null, mount ? {
        shouldMount: currentPlay
      } : null);
    }
  }]);

  return AnimateChild;
}(React.PureComponent); // $FlowIgnoreLine: flow complain about React.forwardRef disable for now

_defineProperty(AnimateChild, "displayName", 'Animate');

_defineProperty(AnimateChild, "defaultProps", {
  durationSeconds: 0.3,
  delaySeconds: 0,
  easeType: 'linear',
  sequenceId: undefined,
  sequenceIndex: undefined
});

var animate = React.forwardRef(function (props, ref) {
  return React.createElement(AnimateContext.Consumer, null, function (_ref) {
    var _ref$animationStates = _ref.animationStates,
        animationStates = _ref$animationStates === void 0 ? {} : _ref$animationStates,
        _ref$register = _ref.register,
        register = _ref$register === void 0 ? undefined : _ref$register;
    return React.createElement(AnimateChild, _extends({}, _objectSpread({}, props, {
      animationStates: animationStates,
      register: register
    }), {
      forwardedRef: ref
    }));
  });
});

// 
function createStyle(_ref) {
  var keyframes = _ref.keyframes,
      animationName = _ref.animationName;
  var animationLength = keyframes.length;
  return "".concat(keyframes.reduce(function (previous, keyframe, currentIndex) {
    if (typeof keyframe === 'string') {
      return "".concat(previous, " ").concat(animationLength === 2 ? currentIndex * 100 : parseFloat((100 / (animationLength - 1)).toFixed(2)) * currentIndex, "% {").concat(keyframe, "}");
    } // $FlowIgnoreLine:


    return "".concat(previous, " ").concat(Object.keys(keyframe)[0], "% {").concat(Object.values(keyframe)[0], "}");
  }, "@keyframes ".concat(animationName, " {")), "}");
}

// 
function createTag(_ref) {
  var keyframes = _ref.keyframes,
      animationName = _ref.animationName;
  var styleTag = document.querySelector('style[data-id-rsi]');

  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.setAttribute('data-id', 'rsi'); // $FlowIgnoreLine:

    document.head.appendChild(styleTag);
  } // $FlowIgnoreLine


  var index = styleTag.sheet.cssRules.length || 0;

  try {
    // $FlowIgnoreLine
    styleTag.sheet.insertRule(createStyle({
      keyframes: keyframes,
      animationName: animationName
    }), index);
  } catch (e) {
    console.error('react simple animate, error found during insert style ', e); // eslint-disable-line no-console
  }

  return {
    styleTag: styleTag,
    index: index
  };
}

// 
function createRandomName() {
  return "RSI-".concat(Math.random().toString(36).substr(2, 9));
}

var AnimateKeyframesChild =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(AnimateKeyframesChild, _React$PureComponent);

  function AnimateKeyframesChild() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AnimateKeyframesChild);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AnimateKeyframesChild)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      play: false
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "createStyleAndTag", function () {
      var keyframes = _this.props.keyframes;
      _this.animationName = createRandomName();

      var _createTag = createTag({
        animationName: _this.animationName,
        keyframes: keyframes
      }),
          styleTag = _createTag.styleTag,
          index = _createTag.index;

      _this.styleTag = styleTag;
      _this.index = index;
    });

    return _this;
  }

  _createClass(AnimateKeyframesChild, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          register = _this$props.register,
          play = _this$props.play;
      this.createStyleAndTag();
      register && register(this.props);

      if (play) {
        this.forceUpdate();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.styleTag.sheet.deleteRule(this.index);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          children = _this$props2.children,
          play = _this$props2.play,
          render = _this$props2.render,
          _this$props2$duration = _this$props2.durationSeconds,
          durationSeconds = _this$props2$duration === void 0 ? 0.3 : _this$props2$duration,
          _this$props2$delaySec = _this$props2.delaySeconds,
          delaySeconds = _this$props2$delaySec === void 0 ? 0 : _this$props2$delaySec,
          _this$props2$easeType = _this$props2.easeType,
          easeType = _this$props2$easeType === void 0 ? 'linear' : _this$props2$easeType,
          _this$props2$playStat = _this$props2.playState,
          playState = _this$props2$playStat === void 0 ? 'running' : _this$props2$playStat,
          _this$props2$directio = _this$props2.direction,
          direction = _this$props2$directio === void 0 ? 'normal' : _this$props2$directio,
          _this$props2$fillMode = _this$props2.fillMode,
          fillMode = _this$props2$fillMode === void 0 ? 'none' : _this$props2$fillMode,
          _this$props2$iteratio = _this$props2.iterationCount,
          iterationCount = _this$props2$iteratio === void 0 ? 1 : _this$props2$iteratio;
      var style = play || this.state.play ? {
        animation: "".concat(durationSeconds, "s ").concat(easeType, " ").concat(delaySeconds, "s ").concat(iterationCount, " ").concat(direction, " ").concat(fillMode, " ").concat(playState, " ").concat(this.animationName)
      } : null;
      return render ? render(style) : React.createElement("div", style ? {
        style: style
      } : null, children);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var animationStates = nextProps.animationStates,
          play = nextProps.play,
          sequenceId = nextProps.sequenceId,
          sequenceIndex = nextProps.sequenceIndex;
      var id = sequenceId || sequenceIndex;
      var currentPlay = play;

      if (id !== undefined && animationStates && animationStates[id]) {
        var state = animationStates[id];
        currentPlay = state.play;
      }

      return _objectSpread({}, currentPlay !== prevState.play ? {
        play: currentPlay
      } : null);
    }
  }]);

  return AnimateKeyframesChild;
}(React.PureComponent); // $FlowIgnoreLine: flow complain about React.forwardRef disable for now

_defineProperty(AnimateKeyframesChild, "displayName", 'AnimateKeyframes');

_defineProperty(AnimateKeyframesChild, "defaultProps", {
  durationSeconds: 0.3,
  delaySeconds: 0,
  easeType: 'linear',
  render: undefined,
  playState: 'running',
  direction: 'normal',
  fillMode: 'none',
  iterationCount: 1,
  children: undefined,
  sequenceId: undefined,
  sequenceIndex: undefined,
  register: undefined
});

var animateKeyframes = React.forwardRef(function (props, ref) {
  return React.createElement(AnimateContext.Consumer, null, function (_ref) {
    var _ref$animationStates = _ref.animationStates,
        animationStates = _ref$animationStates === void 0 ? {} : _ref$animationStates,
        _ref$register = _ref.register,
        register = _ref$register === void 0 ? undefined : _ref$register;
    return React.createElement(AnimateKeyframesChild, _extends({}, _objectSpread({}, props, {
      animationStates: animationStates,
      register: register
    }), {
      forwardedRef: ref
    }));
  });
});

//

exports.Animate = animate;
exports.AnimateGroup = AnimateGroup;
exports.AnimateKeyframes = animateKeyframes;
