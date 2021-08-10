"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPdf = createPdf;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var puppeteer = require('puppeteer');

function createPdf(_x) {
  return _createPdf.apply(this, arguments);
}

function _createPdf() {
  _createPdf = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(buffHtml) {
    var html, opts, browser, page, pdf;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            html = buffHtml.toString('utf-8');
            opts = {
              args: ['--no-sandbox'],
              headless: true
            };
            _context.next = 4;
            return puppeteer.launch(opts);

          case 4:
            browser = _context.sent;
            _context.next = 7;
            return browser.newPage();

          case 7:
            page = _context.sent;
            _context.next = 10;
            return page["goto"]("data:text/html;charset=UTF-8,".concat(html), {
              waitUntil: 'networkidle0'
            });

          case 10:
            _context.next = 12;
            return page.pdf();

          case 12:
            pdf = _context.sent;
            _context.next = 15;
            return browser.close();

          case 15:
            return _context.abrupt("return", pdf);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _createPdf.apply(this, arguments);
}
//# sourceMappingURL=helper.js.map