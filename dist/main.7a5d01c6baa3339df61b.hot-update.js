exports.id = "main";
exports.modules = {

/***/ "./src/graphql/Mutations/index.js":
/*!****************************************!*\
  !*** ./src/graphql/Mutations/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _resolvers = __webpack_require__(/*! ./resolvers */ "./src/graphql/Mutations/resolvers.js");var _resolvers2 = _interopRequireDefault(_resolvers);
var _fs = __webpack_require__(/*! fs */ "fs");var _fs2 = _interopRequireDefault(_fs);
var _path = __webpack_require__(/*! path */ "path");var _path2 = _interopRequireDefault(_path);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default =



{
  schema: _fs2.default.readFileSync(_path2.default.resolve(__dirname, './mutations.graphql'), 'utf8'),
  resolvers: _resolvers2.default };

/***/ }),

/***/ "./src/graphql/utils/readGraphqlFile.js":
false

};