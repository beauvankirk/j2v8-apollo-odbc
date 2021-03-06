'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GraphiQL = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _graphql = require('graphql');

var _ExecuteButton = require('./ExecuteButton');

var _ToolbarButton = require('./ToolbarButton');

var _QueryEditor = require('./QueryEditor');

var _VariableEditor = require('./VariableEditor');

var _ResultViewer = require('./ResultViewer');

var _SqlViewer = require('./SqlViewer');

var _DocExplorer = require('./DocExplorer');

var _CodeMirrorSizer = require('../utility/CodeMirrorSizer');

var _CodeMirrorSizer2 = _interopRequireDefault(_CodeMirrorSizer);

var _getQueryFacts = require('../utility/getQueryFacts');

var _getQueryFacts2 = _interopRequireDefault(_getQueryFacts);

var _getSelectedOperationName = require('../utility/getSelectedOperationName');

var _getSelectedOperationName2 = _interopRequireDefault(_getSelectedOperationName);

var _debounce = require('../utility/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _find = require('../utility/find');

var _find2 = _interopRequireDefault(_find);

var _fillLeafs2 = require('../utility/fillLeafs');

var _elementPosition = require('../utility/elementPosition');

var _introspectionQueries = require('../utility/introspectionQueries');

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
 * GraphiQL
 *
 * This React component is responsible for rendering the GraphiQL editor.
 *
 * Props:
 *
 *   - fetcher: a function which accepts GraphQL-HTTP parameters and returns
 *     a Promise or Observable which resolves to the GraphQL parsed
 *     JSON response.
 *
 *   - schema: a GraphQLSchema instance or `null` if one is not to be used.
 *     If `undefined` is provided, GraphiQL will send an introspection query
 *     using the fetcher to produce a schema.
 *
 *   - query: an optional GraphQL string to use as the initial displayed query,
 *     if `undefined` is provided, the stored query or defaultQuery will
 *     be used.
 *
 *   - variables: an optional GraphQL string to use as the initial displayed
 *     query variables, if `undefined` is provided, the stored variables will
 *     be used.
 *
 *   - operationName: an optional name of which GraphQL operation should be
 *     executed.
 *
 *   - response: an optional JSON string to use as the initial displayed
 *     response. If not provided, no response will be initialy shown. You might
 *     provide this if illustrating the result of the initial query.
 *
 *   - storage: an instance of [Storage][] GraphiQL will use to persist state.
 *     Only `getItem` and `setItem` are called. Default: window.localStorage
 *
 *   - defaultQuery: an optional GraphQL string to use when no query is provided
 *     and no stored query exists from a previous session. If `undefined` is
 *     provided, GraphiQL will use its own default query.
 *
 *   - onEditQuery: an optional function which will be called when the Query
 *     editor changes. The argument to the function will be the query string.
 *
 *   - onEditVariables: an optional function which will be called when the Query
 *     varible editor changes. The argument to the function will be the
 *     variables string.
 *
 *   - onEditOperationName: an optional function which will be called when the
 *     operation name to be executed changes.
 *
 *   - onToggleDocs: an optional function which will be called when the
 *     docs will be toggled. The argument to the function will be a boolean
 *     whether the docs are now open or closed.
 *
 *   - getDefaultFieldNames: an optional function used to provide default fields
 *     to non-leaf fields which invalidly lack a selection set.
 *     Accepts a GraphQLType instance and returns an array of field names.
 *     If not provided, a default behavior will be used.
 *
 * Children:
 *
 *   - <GraphiQL.Logo> Replace the GraphiQL logo with your own.
 *
 *   - <GraphiQL.Toolbar> Add a custom toolbar above GraphiQL.
 *
 *   - <GraphiQL.ToolbarButton> Add a button to the toolbar above GraphiQL.
 *
 *   - <GraphiQL.Footer> Add a custom footer below GraphiQL Results.
 *
 *
 * [Storage]: https://developer.mozilla.org/en-US/docs/Web/API/Storage
 */
var GraphiQL = exports.GraphiQL = function (_React$Component) {
  _inherits(GraphiQL, _React$Component);

  function GraphiQL(props) {
    _classCallCheck(this, GraphiQL);

    // Ensure props are correct
    var _this = _possibleConstructorReturn(this, (GraphiQL.__proto__ || Object.getPrototypeOf(GraphiQL)).call(this, props));

    _initialiseProps.call(_this);

    if (typeof props.fetcher !== 'function') {
      throw new TypeError('GraphiQL requires a fetcher function.');
    }

    // Cache the storage instance
    _this._storage = props.storage || window.localStorage;

    // Determine the initial query to display.
    var query = props.query !== undefined ? props.query : _this._storageGet('query') !== null ? _this._storageGet('query') : props.defaultQuery !== undefined ? props.defaultQuery : defaultQuery;

    // Get the initial query facts.
    var queryFacts = (0, _getQueryFacts2.default)(props.schema, query);

    // Determine the initial variables to display.
    var variables = props.variables !== undefined ? props.variables : _this._storageGet('variables');

    // Determine the initial operationName to use.
    var operationName = props.operationName !== undefined ? props.operationName : (0, _getSelectedOperationName2.default)(null, _this._storageGet('operationName'), queryFacts && queryFacts.operations);

    // Initialize state
    _this.state = _extends({
      schema: props.schema,
      query: query,
      variables: variables,
      operationName: operationName,
      sql: '',
      response: props.response,
      editorFlex: Number(_this._storageGet('editorFlex')) || 1,
      variableEditorOpen: Boolean(variables),
      variableEditorHeight: Number(_this._storageGet('variableEditorHeight')) || 200,
      docExplorerOpen: false,
      docExplorerWidth: Number(_this._storageGet('docExplorerWidth')) || 350,
      isWaitingForResponse: false,
      subscription: null
    }, queryFacts);

    // Ensure only the last executed editor query is rendered.
    _this._editorQueryID = 0;

    // Subscribe to the browser window closing, treating it as an unmount.
    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object') {
      window.addEventListener('beforeunload', function () {
        return _this.componentWillUnmount();
      });
    }
    return _this;
  }

  _createClass(GraphiQL, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Ensure a form of a schema exists (including `null`) and
      // if not, fetch one using an introspection query.
      this._ensureOfSchema();

      // Utility for keeping CodeMirror correctly sized.
      this.codeMirrorSizer = new _CodeMirrorSizer2.default();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var nextSchema = this.state.schema;
      var nextQuery = this.state.query;
      var nextVariables = this.state.variables;
      var nextOperationName = this.state.operationName;
      var nextResponse = this.state.response;

      if (nextProps.schema !== undefined) {
        nextSchema = nextProps.schema;
      }
      if (nextProps.query !== undefined) {
        nextQuery = nextProps.query;
      }
      if (nextProps.variables !== undefined) {
        nextVariables = nextProps.variables;
      }
      if (nextProps.operationName !== undefined) {
        nextOperationName = nextProps.operationName;
      }
      if (nextProps.response !== undefined) {
        nextResponse = nextProps.response;
      }
      if (nextSchema !== this.state.schema || nextQuery !== this.state.query || nextOperationName !== this.state.operationName) {
        this._updateQueryFacts(nextQuery);
      }

      this.setState({
        schema: nextSchema,
        query: nextQuery,
        variables: nextVariables,
        operationName: nextOperationName,
        response: nextResponse
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      // If this update caused DOM nodes to have changed sizes, update the
      // corresponding CodeMirror instance sizes to match.
      this.codeMirrorSizer.updateSizes([this.queryEditorComponent, this.variableEditorComponent, this.resultComponent]);
    }

    // When the component is about to unmount, store any persistable state, such
    // that when the component is remounted, it will use the last used values.

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._storageSet('query', this.state.query);
      this._storageSet('variables', this.state.variables || '');
      this._storageSet('operationName', this.state.operationName);
      this._storageSet('editorFlex', this.state.editorFlex);
      this._storageSet('variableEditorHeight', this.state.variableEditorHeight);
      this._storageSet('docExplorerWidth', this.state.docExplorerWidth);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var children = _react2.default.Children.toArray(this.props.children);

      var logo = (0, _find2.default)(children, function (child) {
        return child.type === GraphiQL.Logo;
      }) || _react2.default.createElement(GraphiQL.Logo, null);

      var toolbar = (0, _find2.default)(children, function (child) {
        return child.type === GraphiQL.Toolbar;
      }) || _react2.default.createElement(GraphiQL.Toolbar, null);

      var footer = (0, _find2.default)(children, function (child) {
        return child.type === GraphiQL.Footer;
      });

      var queryWrapStyle = {
        WebkitFlex: this.state.editorFlex,
        flex: this.state.editorFlex
      };

      var docWrapStyle = {
        display: this.state.docExplorerOpen ? 'block' : 'none',
        width: this.state.docExplorerWidth
      };

      var variableOpen = this.state.variableEditorOpen;
      var variableStyle = {
        height: variableOpen ? this.state.variableEditorHeight : null
      };

      return _react2.default.createElement(
        'div',
        { className: 'graphiql-container' },
        _react2.default.createElement(
          'div',
          { className: 'editorWrap' },
          _react2.default.createElement(
            'div',
            { className: 'topBarWrap' },
            _react2.default.createElement(
              'div',
              { className: 'topBar' },
              logo,
              _react2.default.createElement(_ExecuteButton.ExecuteButton, {
                isRunning: Boolean(this.state.subscription),
                onRun: this.handleRunQuery,
                onStop: this.handleStopQuery,
                operations: this.state.operations
              }),
              _react2.default.createElement(GraphiQL.ToolbarButton, {
                onClick: this.handlePrettifyQuery,
                title: 'Prettify Query',
                label: 'Prettify'
              }),
              toolbar
            ),
            !this.state.docExplorerOpen && _react2.default.createElement(
              'button',
              {
                className: 'docExplorerShow',
                onClick: this.handleToggleDocs },
              'Docs'
            )
          ),
          _react2.default.createElement(
            'div',
            {
              ref: function ref(n) {
                _this2.editorBarComponent = n;
              },
              className: 'editorBar',
              onMouseDown: this.handleResizeStart },
            _react2.default.createElement(
              'div',
              { className: 'queryWrap', style: queryWrapStyle },
              _react2.default.createElement(_QueryEditor.QueryEditor, {
                ref: function ref(n) {
                  _this2.queryEditorComponent = n;
                },
                schema: this.state.schema,
                value: this.state.query,
                onEdit: this.handleEditQuery,
                onHintInformationRender: this.handleHintInformationRender,
                onRunQuery: this.handleEditorRunQuery
              }),
              _react2.default.createElement(
                'div',
                { className: 'variable-editor', style: variableStyle },
                _react2.default.createElement(
                  'div',
                  {
                    className: 'variable-editor-title',
                    style: { cursor: variableOpen ? 'row-resize' : 'n-resize' },
                    onMouseDown: this.handleVariableResizeStart },
                  'Query Variables'
                ),
                _react2.default.createElement(_VariableEditor.VariableEditor, {
                  ref: function ref(n) {
                    _this2.variableEditorComponent = n;
                  },
                  value: this.state.variables,
                  variableToType: this.state.variableToType,
                  onEdit: this.handleEditVariables,
                  onHintInformationRender: this.handleHintInformationRender,
                  onRunQuery: this.handleEditorRunQuery
                })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'resultWrap' },
              this.state.isWaitingForResponse && _react2.default.createElement(
                'div',
                { className: 'spinner-container' },
                _react2.default.createElement('div', { className: 'spinner' })
              ),
              _react2.default.createElement(_ResultViewer.ResultViewer, {
                ref: function ref(c) {
                  _this2.resultComponent = c;
                },
                value: this.state.response
              }),
              _react2.default.createElement(_SqlViewer.SqlViewer, { value: this.state.sql }),
              footer
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'docExplorerWrap', style: docWrapStyle },
          _react2.default.createElement('div', {
            className: 'docExplorerResizer',
            onMouseDown: this.handleDocsResizeStart
          }),
          _react2.default.createElement(
            _DocExplorer.DocExplorer,
            {
              ref: function ref(c) {
                _this2.docExplorerComponent = c;
              },
              schema: this.state.schema },
            _react2.default.createElement(
              'div',
              { className: 'docExplorerHide', onClick: this.handleToggleDocs },
              '\u2715'
            )
          )
        )
      );
    }

    /**
     * Inspect the query, automatically filling in selection sets for non-leaf
     * fields which do not yet have them.
     *
     * @public
     */

  }, {
    key: 'autoCompleteLeafs',
    value: function autoCompleteLeafs() {
      var _this3 = this;

      var _fillLeafs = (0, _fillLeafs2.fillLeafs)(this.state.schema, this.state.query, this.props.getDefaultFieldNames);

      var insertions = _fillLeafs.insertions;
      var result = _fillLeafs.result;

      if (insertions && insertions.length > 0) {
        (function () {
          var editor = _this3.queryEditorComponent.getCodeMirror();
          editor.operation(function () {
            var cursor = editor.getCursor();
            var cursorIndex = editor.indexFromPos(cursor);
            editor.setValue(result);
            var added = 0;
            var markers = insertions.map(function (_ref) {
              var index = _ref.index;
              var string = _ref.string;
              return editor.markText(editor.posFromIndex(index + added), editor.posFromIndex(index + (added += string.length)), {
                className: 'autoInsertedLeaf',
                clearOnEnter: true,
                title: 'Automatically added leaf fields'
              });
            });
            setTimeout(function () {
              return markers.forEach(function (marker) {
                return marker.clear();
              });
            }, 7000);
            var newCursorIndex = cursorIndex;
            insertions.forEach(function (_ref2) {
              var index = _ref2.index;
              var string = _ref2.string;

              if (index < cursorIndex) {
                newCursorIndex += string.length;
              }
            });
            editor.setCursor(editor.posFromIndex(newCursorIndex));
          });
        })();
      }

      return result;
    }

    // Private methods

  }, {
    key: '_ensureOfSchema',
    value: function _ensureOfSchema() {
      var _this4 = this;

      // Only perform introspection if a schema is not provided (undefined)
      if (this.state.schema !== undefined) {
        return;
      }

      var fetcher = this.props.fetcher;

      var fetch = fetcher({ query: _introspectionQueries.introspectionQuery });
      if (!isPromise(fetch)) {
        this.setState({
          response: 'Fetcher did not return a Promise for introspection.'
        });
        return;
      }

      fetch.then(function (result) {
        if (result.data) {
          return result;
        }

        // Try the stock introspection query first, falling back on the
        // sans-subscriptions query for services which do not yet support it.
        var fetch2 = fetcher({ query: _introspectionQueries.introspectionQuerySansSubscriptions });
        if (!isPromise(fetch)) {
          throw new Error('Fetcher did not return a Promise for introspection.');
        }
        return fetch2;
      }).then(function (result) {
        // If a schema was provided while this fetch was underway, then
        // satisfy the race condition by respecting the already
        // provided schema.
        if (_this4.state.schema !== undefined) {
          return;
        }

        if (result && result.data) {
          var schema = (0, _graphql.buildClientSchema)(result.data);
          var queryFacts = (0, _getQueryFacts2.default)(schema, _this4.state.query);
          _this4.setState(_extends({ schema: schema }, queryFacts));
        } else {
          var responseString = typeof result === 'string' ? result : JSON.stringify(result, null, 2);
          _this4.setState({ response: responseString });
        }
      }).catch(function (error) {
        _this4.setState({ response: error && String(error.stack || error) });
      });
    }
  }, {
    key: '_storageGet',
    value: function _storageGet(name) {
      return this._storage && this._storage.getItem('graphiql:' + name);
    }
  }, {
    key: '_storageSet',
    value: function _storageSet(name, value) {
      if (this._storage) {
        this._storage.setItem('graphiql:' + name, value);
      }
    }
  }, {
    key: '_fetchQuery',
    value: function _fetchQuery(query, variables, operationName, cb) {
      var _this5 = this;

      var fetcher = this.props.fetcher;
      var jsonVariables = null;

      try {
        jsonVariables = variables && variables.trim() !== '' ? JSON.parse(variables) : null;
      } catch (error) {
        throw new Error('Variables are invalid JSON: ' + error.message + '.');
      }

      if ((typeof jsonVariables === 'undefined' ? 'undefined' : _typeof(jsonVariables)) !== 'object') {
        throw new Error('Variables are not a JSON object.');
      }

      var fetch = fetcher({
        query: query,
        variables: jsonVariables,
        operationName: operationName
      });

      if (isPromise(fetch)) {
        // If fetcher returned a Promise, then call the callback when the promise
        // resolves, otherwise handle the error.
        fetch.then(cb).catch(function (error) {
          _this5.setState({
            isWaitingForResponse: false,
            response: error && String(error.stack || error)
          });
        });
      } else if (isObservable(fetch)) {
        // If the fetcher returned an Observable, then subscribe to it, calling
        // the callback on each next value, and handling both errors and the
        // completion of the Observable. Returns a Subscription object.
        var subscription = fetch.subscribe({
          next: cb,
          error: function error(_error) {
            _this5.setState({
              isWaitingForResponse: false,
              response: _error && String(_error.stack || _error),
              subscription: null
            });
          },
          complete: function complete() {
            _this5.setState({
              isWaitingForResponse: false,
              subscription: null
            });
          }
        });

        return subscription;
      } else {
        throw new Error('Fetcher did not return Promise or Observable.');
      }
    }
  }, {
    key: '_runQueryAtCursor',
    value: function _runQueryAtCursor() {
      if (this.state.subscription) {
        this.handleStopQuery();
        return;
      }

      var operationName = void 0;
      var operations = this.state.operations;
      if (operations) {
        var editor = this.queryEditorComponent.getCodeMirror();
        if (editor.hasFocus()) {
          var cursor = editor.getCursor();
          var cursorIndex = editor.indexFromPos(cursor);

          // Loop through all operations to see if one contains the cursor.
          for (var i = 0; i < operations.length; i++) {
            var operation = operations[i];
            if (operation.loc.start <= cursorIndex && operation.loc.end >= cursorIndex) {
              operationName = operation.name && operation.name.value;
              break;
            }
          }
        }
      }

      this.handleRunQuery(operationName);
    }
  }, {
    key: '_didClickDragBar',
    value: function _didClickDragBar(event) {
      // Only for primary unmodified clicks
      if (event.button !== 0 || event.ctrlKey) {
        return false;
      }
      var target = event.target;
      // We use codemirror's gutter as the drag bar.
      if (target.className.indexOf('CodeMirror-gutter') !== 0) {
        return false;
      }
      // Specifically the result window's drag bar.
      var resultWindow = _reactDom2.default.findDOMNode(this.resultComponent);
      while (target) {
        if (target === resultWindow) {
          return true;
        }
        target = target.parentNode;
      }
      return false;
    }
  }]);

  return GraphiQL;
}(_react2.default.Component);

// Configure the UI by providing this Component as a child of GraphiQL.


GraphiQL.propTypes = {
  fetcher: _react.PropTypes.func.isRequired,
  schema: _react.PropTypes.instanceOf(_graphql.GraphQLSchema),
  query: _react.PropTypes.string,
  variables: _react.PropTypes.string,
  operationName: _react.PropTypes.string,
  response: _react.PropTypes.string,
  storage: _react.PropTypes.shape({
    getItem: _react.PropTypes.func,
    setItem: _react.PropTypes.func
  }),
  defaultQuery: _react.PropTypes.string,
  onEditQuery: _react.PropTypes.func,
  onEditVariables: _react.PropTypes.func,
  onEditOperationName: _react.PropTypes.func,
  onToggleDocs: _react.PropTypes.func,
  getDefaultFieldNames: _react.PropTypes.func
};

var _initialiseProps = function _initialiseProps() {
  var _this6 = this;

  this.handleRunQuery = function (selectedOperationName) {
    _this6._editorQueryID++;
    var queryID = _this6._editorQueryID;

    // Use the edited query after autoCompleteLeafs() runs or,
    // in case autoCompletion fails (the function returns undefined),
    // the current query from the editor.
    var editedQuery = _this6.autoCompleteLeafs() || _this6.state.query;
    var variables = _this6.state.variables;
    var operationName = _this6.state.operationName;

    // If an operation was explicitly provided, different from the current
    // operation name, then report that it changed.
    if (selectedOperationName && selectedOperationName !== operationName) {
      operationName = selectedOperationName;
      var onEditOperationName = _this6.props.onEditOperationName;
      if (onEditOperationName) {
        onEditOperationName(operationName);
      }
    }

    try {
      // _fetchQuery may return a subscription.
      var subscription = _this6._fetchQuery(editedQuery, variables, operationName, function (result) {
        if (queryID === _this6._editorQueryID) {
          _this6.setState({
            isWaitingForResponse: false,
            response: JSON.stringify(result, null, 2),
            sql: result._headers['x-sql-preview']
          });
        }
      });

      _this6.setState({
        isWaitingForResponse: true,
        response: null,
        subscription: subscription,
        operationName: operationName
      });
    } catch (error) {
      _this6.setState({
        isWaitingForResponse: false,
        response: error.message
      });
    }
  };

  this.handleStopQuery = function () {
    var subscription = _this6.state.subscription;
    _this6.setState({
      isWaitingForResponse: false,
      subscription: null
    });
    if (subscription) {
      subscription.unsubscribe();
    }
    return;
  };

  this.handlePrettifyQuery = function () {
    var query = (0, _graphql.print)((0, _graphql.parse)(_this6.state.query));
    var editor = _this6.queryEditorComponent.getCodeMirror();
    editor.setValue(query);
  };

  this.handleEditQuery = function (value) {
    if (_this6.state.schema) {
      _this6._updateQueryFacts(value);
    }
    _this6.setState({ query: value });
    if (_this6.props.onEditQuery) {
      return _this6.props.onEditQuery(value);
    }
  };

  this._updateQueryFacts = (0, _debounce2.default)(150, function (query) {
    var queryFacts = (0, _getQueryFacts2.default)(_this6.state.schema, query);
    if (queryFacts) {
      // Update operation name should any query names change.
      var operationName = (0, _getSelectedOperationName2.default)(_this6.state.operations, _this6.state.operationName, queryFacts.operations);

      // Report changing of operationName if it changed.
      var onEditOperationName = _this6.props.onEditOperationName;
      if (onEditOperationName && operationName !== _this6.state.operationName) {
        onEditOperationName(operationName);
      }

      _this6.setState(_extends({
        operationName: operationName
      }, queryFacts));
    }
  });

  this.handleEditVariables = function (value) {
    _this6.setState({ variables: value });
    if (_this6.props.onEditVariables) {
      _this6.props.onEditVariables(value);
    }
  };

  this.handleHintInformationRender = function (elem) {
    elem.addEventListener('click', _this6._onClickHintInformation);

    var _onRemoveFn = void 0;
    elem.addEventListener('DOMNodeRemoved', _onRemoveFn = function onRemoveFn() {
      elem.removeEventListener('DOMNodeRemoved', _onRemoveFn);
      elem.removeEventListener('click', _this6._onClickHintInformation);
    });
  };

  this.handleEditorRunQuery = function () {
    _this6._runQueryAtCursor();
  };

  this._onClickHintInformation = function (event) {
    if (event.target.className === 'typeName') {
      var typeName = event.target.innerHTML;
      var schema = _this6.state.schema;
      if (schema) {
        (function () {
          var type = schema.getType(typeName);
          if (type) {
            _this6.setState({ docExplorerOpen: true }, function () {
              _this6.docExplorerComponent.showDoc(type);
            });
          }
        })();
      }
    }
  };

  this.handleToggleDocs = function () {
    if (typeof _this6.props.onToggleDocs === 'function') {
      _this6.props.onToggleDocs(!_this6.state.docExplorerOpen);
    }
    _this6.setState({ docExplorerOpen: !_this6.state.docExplorerOpen });
  };

  this.handleResizeStart = function (downEvent) {
    if (!_this6._didClickDragBar(downEvent)) {
      return;
    }

    downEvent.preventDefault();

    var offset = downEvent.clientX - (0, _elementPosition.getLeft)(downEvent.target);

    var onMouseMove = function onMouseMove(moveEvent) {
      if (moveEvent.buttons === 0) {
        return onMouseUp();
      }

      var editorBar = _reactDom2.default.findDOMNode(_this6.editorBarComponent);
      var leftSize = moveEvent.clientX - (0, _elementPosition.getLeft)(editorBar) - offset;
      var rightSize = editorBar.clientWidth - leftSize;
      _this6.setState({ editorFlex: leftSize / rightSize });
    };

    var onMouseUp = function (_onMouseUp) {
      function onMouseUp() {
        return _onMouseUp.apply(this, arguments);
      }

      onMouseUp.toString = function () {
        return _onMouseUp.toString();
      };

      return onMouseUp;
    }(function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      onMouseMove = null;
      onMouseUp = null;
    });

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  this.handleDocsResizeStart = function (downEvent) {
    downEvent.preventDefault();

    var hadWidth = _this6.state.docExplorerWidth;
    var offset = downEvent.clientX - (0, _elementPosition.getLeft)(downEvent.target);

    var onMouseMove = function onMouseMove(moveEvent) {
      if (moveEvent.buttons === 0) {
        return onMouseUp();
      }

      var app = _reactDom2.default.findDOMNode(_this6);
      var cursorPos = moveEvent.clientX - (0, _elementPosition.getLeft)(app) - offset;
      var docsSize = app.clientWidth - cursorPos;

      if (docsSize < 100) {
        _this6.setState({ docExplorerOpen: false });
      } else {
        _this6.setState({
          docExplorerOpen: true,
          docExplorerWidth: Math.min(docsSize, 650)
        });
      }
    };

    var onMouseUp = function (_onMouseUp2) {
      function onMouseUp() {
        return _onMouseUp2.apply(this, arguments);
      }

      onMouseUp.toString = function () {
        return _onMouseUp2.toString();
      };

      return onMouseUp;
    }(function () {
      if (!_this6.state.docExplorerOpen) {
        _this6.setState({ docExplorerWidth: hadWidth });
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      onMouseMove = null;
      onMouseUp = null;
    });

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  this.handleVariableResizeStart = function (downEvent) {
    downEvent.preventDefault();

    var didMove = false;
    var wasOpen = _this6.state.variableEditorOpen;
    var hadHeight = _this6.state.variableEditorHeight;
    var offset = downEvent.clientY - (0, _elementPosition.getTop)(downEvent.target);

    var onMouseMove = function onMouseMove(moveEvent) {
      if (moveEvent.buttons === 0) {
        return onMouseUp();
      }

      didMove = true;

      var editorBar = _reactDom2.default.findDOMNode(_this6.editorBarComponent);
      var topSize = moveEvent.clientY - (0, _elementPosition.getTop)(editorBar) - offset;
      var bottomSize = editorBar.clientHeight - topSize;
      if (bottomSize < 60) {
        _this6.setState({
          variableEditorOpen: false,
          variableEditorHeight: hadHeight
        });
      } else {
        _this6.setState({
          variableEditorOpen: true,
          variableEditorHeight: bottomSize
        });
      }
    };

    var onMouseUp = function (_onMouseUp3) {
      function onMouseUp() {
        return _onMouseUp3.apply(this, arguments);
      }

      onMouseUp.toString = function () {
        return _onMouseUp3.toString();
      };

      return onMouseUp;
    }(function () {
      if (!didMove) {
        _this6.setState({ variableEditorOpen: !wasOpen });
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      onMouseMove = null;
      onMouseUp = null;
    });

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
};

GraphiQL.Logo = function GraphiQLLogo(props) {
  return _react2.default.createElement(
    'div',
    { className: 'title' },
    props.children || _react2.default.createElement(
      'span',
      null,
      'Graph',
      _react2.default.createElement(
        'em',
        null,
        'si'
      ),
      'QL'
    )
  );
};

// Configure the UI by providing this Component as a child of GraphiQL.
GraphiQL.Toolbar = function GraphiQLToolbar(props) {
  return _react2.default.createElement(
    'div',
    { className: 'toolbar' },
    props.children
  );
};

// Add a button to the Toolbar.
GraphiQL.ToolbarButton = _ToolbarButton.ToolbarButton;

// Configure the UI by providing this Component as a child of GraphiQL.
GraphiQL.Footer = function GraphiQLFooter(props) {
  return _react2.default.createElement(
    'div',
    { className: 'footer' },
    props.children
  );
};

var defaultQuery = '# Welcome to GraphiQL\n#\n# GraphiQL is an in-browser IDE for writing, validating, and\n# testing GraphQL queries.\n#\n# Type queries into this side of the screen, and you will\n# see intelligent typeaheads aware of the current GraphQL type schema and\n# live syntax and validation errors highlighted within the text.\n#\n# To bring up the auto-complete at any point, just press Ctrl-Space.\n#\n# Press the run button above, or Cmd-Enter to execute the query, and the result\n# will appear in the pane to the right.\n\n';

// Duck-type promise detection.
function isPromise(value) {
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && typeof value.then === 'function';
}

// Duck-type observable detection.
function isObservable(value) {
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && typeof value.subscribe === 'function';
}