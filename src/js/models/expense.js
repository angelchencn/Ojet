define(['ojs/ojmodel'], function(){
  var Expense = oj.Model.extend({
    urlRoot: 'http://49.235.89.16:5000/api/expense',
  });

  return Expense;
});