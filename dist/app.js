"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = require("body-parser");

var _helmet = _interopRequireDefault(require("helmet"));

var _compression = _interopRequireDefault(require("compression"));

var _path = _interopRequireDefault(require("path"));

var app = (0, _express["default"])();
app.use((0, _bodyParser.json)());
app.use((0, _compression["default"])());
app.use((0, _helmet["default"])({
  contentSecurityPolicy: false
}));
app.use(_express["default"]["static"](_path["default"].join(__dirname, '../static')));
app.post('/genpdf', function (req, res) {
  res.json({
    message: 'it works'
  });
});
var _default = app;
exports["default"] = _default;
//# sourceMappingURL=app.js.map