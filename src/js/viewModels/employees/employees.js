define(['models/employee',
    'models/employees',
    'knockout',
    'ojs/ojmodel',
    'ojs/ojvalidation-base',
    'ojs/ojinputtext',
    'ojs/ojformlayout',
    'ojs/ojlabel',
    'ojs/ojbutton',
    'ojs/ojinputnumber',
    'ojs/ojcollectiondataprovider',
    'ojs/ojpagingdataproviderview',
    'ojs/ojpagingcontrol',
    'ojs/ojdatagrid',
    'ojs/ojcollectiondatagriddatasource',
    'ojs/ojinputtext',
    'ojs/ojinputnumber',
    'ojs/ojdatetimepicker',
    'ojs/ojformlayout'
],
    function (Employee, Employees, ko, Model, Validation) {
        var viewModel = function (params) {
            var self = this;

            var dateOptions = { formatType: 'date', dateFormat: 'medium' };
            var dateConverterFactory = Validation.Validation.converterFactory("datetime");
            this.dateConverter = dateConverterFactory.createConverter(dateOptions);


            this.employees = new Employees();
            this.employees
                .fetch({
                    startIndex: 0,
                    fetchSize: 50
                })
                .then(function () {
                    console.log(self.employees.toJSON());
                });

            this.dataProvider = new oj.CollectionDataGridDataSource(
                this.employees, {
                rowHeader: 'empNo',
                columns: ['firstName', 'lastName', 'gender', 'birthDate', 'hireDate']
            });

            //intialize the observable values in the forms
            this.inputFirstName = ko.observable();
            this.inputLastName = ko.observable();
            this.inputGender = ko.observable();
            this.inputBirthDate = ko.observable(Validation.IntlConverterUtils.dateToLocalIso(new Date()));
            this.inputBirthDate = ko.observable(Validation.IntlConverterUtils.dateToLocalIso(new Date()));
            this.inputHireDate = ko.observable();

            //used to update the fields based on the selected row
            this.updateFields = function (model) {
                this.inputEmployeeID(model.get('empNo'));
                this.inputFirstName(model.get('firstName'));
                this.inputLastName(model.get('lastName'));
                this.inputGender(model.get('gender'));
                this.inputBirthDate(model.get('birthDate'));
                this.inputHireDate(model.get('hireDate'));
            };

            //add the model to the collection at index 0
            this.add = function () {
                //if (this.inputEmployeeID(nextKey) < nextKey) {
                //    this.inputEmployeeID(nextKey);
                //}
                //var model = this.buildModel();
                //nextKey += 1;
                //this.inputEmployeeID(nextKey);
                //this.collection.add(model, { at: 0 });
            }.bind(this);

            // update the model in the collection
            this.update = function () {
                //if (this.modelToUpdate) {
                //    this.modelToUpdate.set(this.buildModel());
                //}
            }.bind(this);

            //remove the selected model from the collection
            this.remove = function () {
                //this.collection.remove(this.modelToUpdate);
            }.bind(this);

            //reset the fields to their original values
            this.resetFields = function () {
                this.inputEmployeeID(nextKey);
                this.inputFirstName('Jane');
                this.inputLastName('Doe');
                this.inputHireDate(Validation.IntlConverterUtils.dateToLocalIso(new Date()));
                this.inputSalary(15000);
            }.bind(this);

            document.getElementById('datagrid').addEventListener('selectionChanged', function (event) {
                //on selection change update fields with the selected model
                var selection = event.detail['value'][0];
                if (selection != null) {
                    var rowKey = selection['startKey']['row'];
                    this.modelToUpdate = this.collection.get(rowKey);
                    this.updateFields(this.modelToUpdate);
                }
            }.bind(this));

        }
        return viewModel;
    }
);