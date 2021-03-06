'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SqlViewer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  Copyright (c) 2015, Facebook, Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  This source code is licensed under the license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  LICENSE-examples file in the root directory of this source tree.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * ResultViewer
 *
 * Maintains an instance of CodeMirror for viewing a GraphQL response.
 *
 * Props:
 *
 *   - value: The text of the editor.
 *
 */
var SqlViewer = exports.SqlViewer = function (_React$Component) {
  _inherits(SqlViewer, _React$Component);

  function SqlViewer() {
    _classCallCheck(this, SqlViewer);

    return _possibleConstructorReturn(this, (SqlViewer.__proto__ || Object.getPrototypeOf(SqlViewer)).apply(this, arguments));
  }

  _createClass(SqlViewer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Lazily require to ensure requiring GraphiQL outside of a Browser context
      // does not produce an error.
      var CodeMirror = require('codemirror');
      require('codemirror/addon/fold/foldgutter');
      require('codemirror/addon/fold/brace-fold');
      require('codemirror/keymap/sublime');
      require('codemirror/mode/sql/sql');

      window.code = this.viewer = CodeMirror(_reactDom2.default.findDOMNode(this), {
        value: this.props.value || '',
        readOnly: true,
        theme: 'default',
        mode: 'text/x-sql',
        keyMap: 'sublime',
        extraKeys: {
          // Editor improvements
          'Ctrl-Left': 'goSubwordLeft',
          'Ctrl-Right': 'goSubwordRight',
          'Alt-Left': 'goGroupLeft',
          'Alt-Right': 'goGroupRight'
        }
      });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return this.props.value !== nextProps.value;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.viewer.setValue(this.props.value || '');
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.viewer = null;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', { className: 'sql-window' });
    }

    /**
     * Public API for retrieving the CodeMirror instance from this
     * React component.
     */

  }, {
    key: 'getCodeMirror',
    value: function getCodeMirror() {
      return this.viewer;
    }
  }]);

  return SqlViewer;
}(_react2.default.Component);

SqlViewer.propTypes = {
  value: _react.PropTypes.string
};