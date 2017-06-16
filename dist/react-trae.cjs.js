'use strict'

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex
}

var React = _interopDefault(require('react'))
var PropTypes = _interopDefault(require('prop-types'))
var trae = _interopDefault(require('trae'))

var classCallCheck = function(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

var createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i]
      descriptor.enumerable = descriptor.enumerable || false
      descriptor.configurable = true
      if ('value' in descriptor) descriptor.writable = true
      Object.defineProperty(target, descriptor.key, descriptor)
    }
  }

  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps)
    if (staticProps) defineProperties(Constructor, staticProps)
    return Constructor
  }
})()

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i]

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key]
        }
      }
    }

    return target
  }

var inherits = function(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' +
        typeof superClass
    )
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  })
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass)
}

var possibleConstructorReturn = function(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    )
  }

  return call && (typeof call === 'object' || typeof call === 'function')
    ? call
    : self
}

var toConsumableArray = function(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++)
      arr2[i] = arr[i]

    return arr2
  } else {
    return Array.from(arr)
  }
}

var METHODS = ['get', 'put', 'patch', 'post', 'head', 'delete']
var WITH_BODY = ['put', 'patch', 'post']

var BODYTYPES = ['arrayBuffer', 'blob', 'formData', 'json', 'text', 'raw']
var MODES = ['same-origin', 'no-cors', 'cors', 'navigate']
var CREDENTIALS = ['omit', 'same-origin', 'include']
var CACHES = [
  'default',
  'no-store',
  'reload',
  'no-cache',
  'force-cache',
  'only-if-cached',
]

var Trae = (function(_React$Component) {
  inherits(Trae, _React$Component)

  function Trae() {
    var _ref

    var _temp, _this, _ret

    classCallCheck(this, Trae)

    for (
      var _len = arguments.length, args = Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key]
    }

    return (_ret = (
      (_temp = (
        (_this = possibleConstructorReturn(
          this,
          (_ref = Trae.__proto__ || Object.getPrototypeOf(Trae)).call.apply(
            _ref,
            [this].concat(args)
          )
        )),
        _this
      )),
      (_this.state = {
        loading: true,
        error: false,
        data: {},
      }),
      _temp
    )), possibleConstructorReturn(_this, _ret)
  }

  createClass(Trae, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this2 = this

        trae[this.props.method]
          .apply(trae, toConsumableArray(this.requestParams()))
          .then(function(response) {
            return _this2.setState(_extends({ loading: false }, response))
          })
          .catch(function(error) {
            return _this2.setState(
              _extends({ loading: false, error: error }, error)
            )
          })
      },
    },
    {
      key: 'requestParams',
      value: function requestParams() {
        var _props = this.props,
          url = _props.url,
          method = _props.method,
          bodyType = _props.bodyType,
          mode = _props.mode,
          credentials = _props.credentials,
          cache = _props.cache,
          body = _props.body,
          params = _props.params,
          headers = _props.headers

        var config = {
          bodyType: bodyType,
          mode: mode,
          credentials: credentials,
          cache: cache,
          params: params,
          headers: headers,
        }

        return WITH_BODY.includes(method) ? [url, body, config] : [url, config]
      },
    },
    {
      key: 'render',
      value: function render() {
        return this.props.children(this.state)
      },
    },
  ])
  return Trae
})(React.Component)

Trae.propTypes = {
  children: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  method: PropTypes.oneOf(METHODS),
  bodyType: PropTypes.oneOf(BODYTYPES),
  mode: PropTypes.oneOf(MODES),
  credentials: PropTypes.oneOf(CREDENTIALS),
  cache: PropTypes.oneOf(CACHES),
  body: PropTypes.any,
  params: PropTypes.object,
  headers: PropTypes.object,
}
Trae.defaultProps = {
  method: 'get',
  bodyType: 'json',
  mode: 'cors',
  credentials: 'omit',
  cache: 'default',
  body: {},
  params: {},
  headers: {},
}

module.exports = Trae
