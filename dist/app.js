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

var _helper = require("./helper");

var app = (0, _express["default"])();
app.use((0, _bodyParser.json)());
app.use((0, _compression["default"])());
app.use((0, _helmet["default"])({
  contentSecurityPolicy: false
}));
app.use(_express["default"]["static"](_path["default"].join(__dirname, '../static')));
app.post('/genpdf', function (req, res) {
  process.nextTick(function () {
    var html = req.body.html;
    var buff = Buffer.from(html, 'base64');
    (0, _helper.createPdf)(buff).then(function (pdf) {
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Length': pdf.length,
        'Content-disposition': "inline; filename=test.pdf"
      });
      res.send(pdf);
    })["catch"](function (err) {
      res.json({
        message: 'error',
        error: err.message
      });
    });
  });
});
app.post('/genpdf2', function (req, res, next) {
  if (req.query.apikey == 'ABCDEF') {
    next();
  } else {
    res.status(401).json({
      message: 'unauthorized'
    });
  }
}, function (req, res) {
  process.nextTick(function () {
    var html = req.body.html;
    var buff = Buffer.from(html, 'base64');
    (0, _helper.createPdf)(buff).then(function (pdf) {
      res.send(pdf.toString('base64'));
    })["catch"](function (err) {
      res.json({
        message: 'error',
        error: err.message
      });
    });
  });
});
var _default = app;
exports["default"] = _default;
//# sourceMappingURL=app.js.map