define(['./employee', './base-collection', 'ojs/ojmodel',
  'ojs/ojcore'], function (Expense, BaseCollection) {
    window.anoop = BaseCollection;
    var Employees = BaseCollection.extend({
      initialize: function (params) {
        BaseCollection.prototype.initialize.call(this, params);
      },
      url: 'http://localhost:9090/rest/employees',
      model: Expense,
      customURL: function (operation, collection, options) {
        if (!isNaN(options.fetchSize) && !isNaN(options.startIndex)) {
          return `http://localhost:9090/rest/employees?$limit=${options.fetchSize}&$skip=${options.startIndex}`;
        }

        return 'http://localhost:9090/rest/employees';
      }
    });

    return Employees;
  });