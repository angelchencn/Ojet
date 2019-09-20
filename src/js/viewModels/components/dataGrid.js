define(['ojs/ojcore',
    'ojs/ojmodel',
    'ojs/ojvalidation-base',
    'knockout',
    'ojs/ojknockout',
    'ojs/ojdatagrid',
    'ojs/ojcollectiondatagriddatasource',
    'ojs/ojinputtext',
    'ojs/ojinputnumber',
    'ojs/ojdatetimepicker',
    'ojs/ojformlayout'],
    function (oj, Model, Validation, ko) {
        function viewModel() {
            var dateOptions = { formatType: 'date', dateFormat: 'medium' };
            var dateConverterFactory = Validation.Validation.converterFactory("datetime");
            this.dateConverter = dateConverterFactory.createConverter(dateOptions);

            var salaryOptions = {
                style: "currency",
                currency: "USD",
                currencyDisplay: "symbol"
            };
            var salaryConverterFactory =
                Validation.Validation.converterFactory("number");
            this.salaryConverter =
                salaryConverterFactory.createConverter(salaryOptions);

            this.collection = new Model.Collection(null, {
                model: new Model.Model.extend({ idAttribute: 'EMPLOYEE_ID' }),
                url: '../../../sampleData/employeeData.json'
            });

            this.dataSource = new oj.CollectionDataGridDataSource(
                this.collection, {
                rowHeader: 'EMPLOYEE_ID',
                columns: ['FIRST_NAME', 'LAST_NAME', 'HIRE_DATE', 'SALARY']
            });

            var nextKey = 121;

            //build a new model from the observables in the form
            this.buildModel = function () {
                return {
                    'EMPLOYEE_ID': this.inputEmployeeID(),
                    'FIRST_NAME': this.inputFirstName(),
                    'LAST_NAME': this.inputLastName(),
                    'HIRE_DATE': this.inputHireDate(),
                    'SALARY': this.inputSalary()
                }
            }.bind(this);

            //used to update the fields based on the selected row
            this.updateFields = function (model) {
                this.inputEmployeeID(model.get('EMPLOYEE_ID'));
                this.inputFirstName(model.get('FIRST_NAME'));
                this.inputLastName(model.get('LAST_NAME'));
                this.inputHireDate(model.get('HIRE_DATE'));
                this.inputSalary(model.get('SALARY'));
            };

            //add the model to the collection at index 0
            this.add = function () {
                if (this.inputEmployeeID(nextKey) < nextKey) {
                    this.inputEmployeeID(nextKey);
                }
                var model = this.buildModel();
                nextKey += 1;
                this.inputEmployeeID(nextKey);
                this.collection.add(model, { at: 0 });
            }.bind(this);

            // update the model in the collection
            this.update = function () {
                if (this.modelToUpdate) {
                    this.modelToUpdate.set(this.buildModel());
                }
            }.bind(this);

            //remove the selected model from the collection
            this.remove = function () {
                this.collection.remove(this.modelToUpdate);
            }.bind(this);

            //reset the fields to their original values
            this.resetFields = function () {
                this.inputEmployeeID(nextKey);
                this.inputFirstName('Jane');
                this.inputLastName('Doe');
                this.inputHireDate(Validation.IntlConverterUtils.dateToLocalIso(new Date()));
                this.inputSalary(15000);
            }.bind(this);

            //intialize the observable values in the forms
            this.inputEmployeeID = ko.observable(nextKey);
            this.inputFirstName = ko.observable('Jane');
            this.inputLastName = ko.observable('Doe');
            this.inputHireDate = ko.observable(Validation.IntlConverterUtils.dateToLocalIso(new Date()));
            this.inputSalary = ko.observable(15000);

            this.getCellClassName = function (cellContext) {
                var key = cellContext['keys']['column'];
                if (key === 'SALARY') {
                    return 'oj-helper-justify-content-right';
                }
                return 'oj-helper-justify-content-flex-start';
            }

            /*document.getElementById('datagrid').addEventListener('selectionChanged', function (event) {
                //on selection change update fields with the selected model
                var selection = event.detail['value'][0];
                if (selection != null) {
                    var rowKey = selection['startKey']['row'];
                    this.modelToUpdate = this.collection.get(rowKey);
                    this.updateFields(this.modelToUpdate);
                }
            }.bind(this));*/
        };

        return new viewModel();
    });