/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your expense ViewModel code goes here
 */
define([
  'models/expense',
  'models/expenses',
  'knockout',
  'ojs/ojinputtext',
  'ojs/ojformlayout',
  'ojs/ojlabel',
  'ojs/ojbutton',
  'ojs/ojinputnumber', 
  'ojs/ojcollectiondataprovider',
  'ojs/ojpagingdataproviderview', 
  'ojs/ojpagingcontrol',
  'ojs/ojtable',
],
  function (Expense, Expenses, ko) {
    function ExpenseViewModel() {
      var self = this;

      this.columnOptions = [
        { "headerText": "Description", "field": "description" },
        { "headerText": "Amount", "field": "amount" }];
        //this.expenses = new Expenses();

      this.expenses = new Expenses();
      this.expenses
        .fetch({
          startIndex: 0,
          fetchSize: 5
        })
        .then(function () {
          console.log(self.expenses.toJSON());
        });

      this.dataProvider = new oj.CollectionDataProvider(this.expenses);
      this.pagingDataProvider = ko.observable();
      this.pagingDataProvider(new oj.PagingDataProviderView(this.dataProvider));

      this.form = {
        description: ko.observable(),
        amount: ko.observable()
      };

      this.createExpense = function () {
        var ex = new Expense();

        ex.set('description', self.form.description());
        ex.set('amount', self.form.amount());
        ex
          .save()
          .then(function () {
            self.expenses.add(ex);
            self.resetForm();
          });
      };

      /*this.deleteExpense = function (event, data) {
        var expenseIds = [];
        deptIds = this.findDeptIds();
        var collection = data.DeptCol();
        deptIds.forEach(function (value, index, arr) {
          var model = collection.get(value);
          if (model) {
            collection.remove(model);
            model.destroy();
          }
        });
        this.enableDelete();
        document.getElementById("table").refresh();
      }.bind(this);*/

      this.resetForm = function () {
        self.form.description('');
        self.form.amount(null);
      }

    }

    //return ExpenseViewModel;
    return new ExpenseViewModel();
  }
);
