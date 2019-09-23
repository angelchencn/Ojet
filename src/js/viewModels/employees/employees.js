define(['knockout', 'ojs/ojinputtext'],
    function (ko) {
        var viewModel = function (params) {
            var self = this;
            this.columnOptions = [
                { "headerText": "Employee No", "field": "empNo" },
                { "headerText": "First Name", "field": "firstName" },
                { "headerText": "Last Name", "field": "lastName" },
                { "headerText": "Gender", "field": "Gender" },
                { "headerText": "Birth Date", "field": "birthDate" },
                { "headerText": "Hire Date", "field": "hireDate" }
            ];
        
              this.employees = new Employees();
              this.employees
                .fetch({
                  startIndex: 0,
                  fetchSize: 5
                })
                .then(function () {
                  console.log(self.employees.toJSON());
                });
        
              this.dataProvider = new oj.CollectionDataProvider(this.employees);
              this.pagingDataProvider = ko.observable();
              this.pagingDataProvider(new oj.PagingDataProviderView(this.dataProvider));
        
              this.form = {
                description: ko.observable(),
                amount: ko.observable()
              };
        
        }
        return viewModel;
    }
);