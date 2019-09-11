define([
    'knockout',
    'ojs/ojhtmlutils',
    'ojs/ojarraydataprovider',
    'ojs/ojknockout',
    'ojs/ojinputtext',
    'ojs/ojlabel',
    'ojs/ojknockout',
    'ojs/ojbinddom'],
    function (ko, HtmlUtils, ArrayDataProvider) {
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
        }
        return new ViewModel("Alex", "Chen");
    }
);