"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

module.exports = function (response) {
  var data = this.opts.responseAdapter.call(this, response);

  if (this.opts.useDrawCounter) {
    if (typeof data.draw === 'undefined') {
      console.error("Cannot find `draw` property in response. This response parameter is required when useDrawCounter is set to true");
      return;
    }

    if (this.drawCounter !== data.draw) {
      return;
    }
  }

  if (this.opts.pagination.virtual && this.page !== 1) {
    this.data = this.data.concat(data.data);
  } else {
    this.data = data.data;
  }

  if (isNaN(data.count)) {
    console.error("vue-tables-3: invalid 'count' property. Expected number, got ".concat(_typeof(data.count)));
    console.error('count equals', data.count);
    throw new Error();
  }

  this.count = parseInt(data.count);
  setTimeout(function () {
    this.dispatch('loaded', response);
  }.bind(this), 0);
};