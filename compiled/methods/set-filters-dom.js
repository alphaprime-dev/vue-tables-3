"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

module.exports = function (query) {
  var el;

  if (this.opts.filterByColumn) {
    for (var column in query) {
      if (this.isDateFilter(column)) {
        if (query[column] && _typeof(query[column]) === 'object') {
          var start = typeof query[column].start === 'string' ? moment(query[column].start, 'YYYY-MM-DD') : query[column].start;
          var end = typeof query[column].end === 'string' ? moment(query[column].end, 'YYYY-MM-DD') : query[column].end;

          this._setDatepickerText(column, start, end);
        } else {
          $(this.refs.filters[column]).html("<span class='VueTables__filter-placeholder'>" + this.display('filterBy', {
            column: this.getHeading(column)
          }) + "</span>");
        }

        continue;
      }

      el = this.refs.filters[column];

      if (el) {
        el.value = query[column];
      } else if (this.columns.indexOf(column) === -1) {
        console.error("vue-tables-3: Error in setting filter value. Column '".concat(column, "' does not exist."));
      }
    }
  } else {
    var el = this.refs.genericFilter;
    if (el) el.value = query;
  }
};