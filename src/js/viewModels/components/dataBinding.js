define([
    'knockout',
    'ojs/ojhtmlutils',
    'ojs/ojarraydataprovider',
    'ojs/ojarraytreedataprovider',
    'ojs/ojmodule-element-utils',
    'ojs/ojlogger',
    'text!../../../sampleData/product.json',
    'text!../../../sampleData/animals.json',
    'ojs/ojcomponentcore',
    'ojs/ojknockout',
    'ojs/ojinputtext',
    'ojs/ojlabel',
    'ojs/ojknockout',
    'ojs/ojbinddom',
    'ojs/ojavatar',
    'ojs/ojbutton',
    'ojs/ojcollapsible',
    'ojs/ojdefer'],
    function (ko, HtmlUtils, ArrayDataProvider, ArrayTreeDataProvider, ModuleElementUtils, Logger, produceData, animalData, Components) {
        function ViewModel(first, last) {

            //////////////////Data Binding//////////////////
            var viewStr = '<oj-label for="[[inputId1]]">oj-input-text element</oj-label>' +
                '<oj-input-text :id="[[inputId1]]" value="{{value}}"></oj-input-text>';
            this.testVal = "Data Bining";
            this.config = {
                view: HtmlUtils.stringToNodeArray(viewStr),
                data: {
                    inputId1: 'text-input1',
                    value: "This text value is bound."
                }
            }
            this.firstName = ko.observable(first);
            this.lastName = ko.observable(last);
            this.fullName = ko.pureComputed(function () {
                return this.firstName() + " " + this.lastName();
            }, this);

            //////////////////Change Style//////////////////
            this.classArrayObs = ko.observableArray();
            var classList = ['pink', 'bold', 'italic'];
            this.clickListener1 = function (event, data, bindingContext) {
                var newClass = classList.pop();
                this.classArrayObs.push(newClass);

                // Disable the add button once we're out of classes
                if (classList.length === 0)
                    document.getElementById('button1').disabled = true;
            }.bind(this);

            //////////////////For Each User Binding//////////////////
            var userIdCount = 0;
            var users = ko.observableArray([
                { name: "Bert" },
                { name: "Charles" },
                { name: "Denise" }
            ]);
            this.dataProvider = new ArrayDataProvider(users, { keyAttributes: 'name' });
            this.removeUser = function (event, current, bindingContext) {
                users.remove(current.data);
            };
            this.addUser = function () {
                users.push({ name: "User " + userIdCount++ });
            };

            //////////////////For Each Binding(Nested)//////////////////
            this.categories = new ArrayTreeDataProvider(JSON.parse(produceData), { keyAttributes: "name" });

            //////////////////For Each Binding In Table//////////////////
            var animals = new ArrayDataProvider(JSON.parse(animalData), { keyAttributes: 'name' });

            var zooTableViewModel = { animals: animals }; // view model  for the table
            // load view and update module config
            var viewPromise = ModuleElementUtils.createView({ 'viewPath': 'views/components/zooTable.html' });
            this.moduleConfig = viewPromise.then(
                function (zooTableView) {
                    return { 'view': zooTableView, 'viewModel': zooTableViewModel };
                }.bind(this),
                function (error) {
                    Logger.error('Error during loading view: ' + error.message);
                    return { 'view': [] };
                }
            );
            //////////////////If Binding//////////////////
            this.buttonValue = ko.observable("off");
            this.buttonValue.subscribe(function (newValue) {
                console.log("button new status: " + newValue);
            });
            this.activate = function () {
                Components.subtreeShown(document.getElementById('subtree'));
            };


        }
        return new ViewModel("Alex", "Chen");
    }
);