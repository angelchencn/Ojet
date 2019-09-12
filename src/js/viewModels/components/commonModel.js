define([
    'knockout', 
    'ojs/ojmodel', 
    'ojs/ojcollectiondataprovider', 
    'MockRESTServer', 
    'text!../../../sampleData/departments.json', 
    'ojs/ojknockout', 
    'ojs/ojknockout-model',
    'ojs/ojtable', 
    'ojs/ojcheckboxset', 
    'ojs/ojinputnumber', 
    'ojs/ojinputtext', 
    'ojs/ojdialog', 
    'ojs/ojbutton', 
    'mockjax', 
    'ojs/ojformlayout'],
    function (ko, Model, CollectionDataProvider, MockRESTServer, jsonData) {
        function viewModel() {
          this.somethingChecked = ko.observable(false);
          this.currentDeptName = ko.observable('default');
          this.newDeptId = ko.observable(555);
          this.newDeptName = ko.observable('');
          this.workingId = ko.observable('');
  
          this.findDeptIds = function () {
            var selectedIdsArray = [];
            var divs = document.getElementsByTagName("oj-checkboxset");
            for (var i = 0; i < divs.length; i++) {
              //var cb = divs[i];
              var cbComp = divs[i];
              if (cbComp.value && cbComp.value.length) {
                selectedIdsArray.push(cbComp.value[0]);
              }
            }
            return selectedIdsArray;
          }
  
          // Deletion handlers/helpers
          this.enableDelete = function (event) {
            this.somethingChecked(event && event.target && event.target.value && event.target.value.length);
          }.bind(this);
  
          this.deleteDepartment = function (event, data) {
            var deptIds = [];
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
          }.bind(this);
  
          // Update handlers/helpers
          this.showChangeNameDialog = function (deptId, event, data) {
            var currName = data.DepartmentName;
            this.workingId(deptId);
            this.currentDeptName(currName);
            document.getElementById("editDialog").open();
          }
  
          this.cancelDialog = function () {
            document.getElementById("editDialog").close();
            return true;
          }
  
          this.updateDeptName = function (event) {
            var currentId = this.workingId();
            var myCollection = this.DeptCol();
            var myModel = myCollection.get(currentId);
            var newName = this.currentDeptName();
            if (newName != myModel.get('DepartmentName') && newName != '') {
              myModel.save({ 'DepartmentName': newName }, {
                success: function (myModel, response, options) {
                  document.getElementById("editDialog").close();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                  alert("Update failed with: " + textStatus);
                  document.getElementById("editDialog").close();
                }
              });
            } else {
              alert('Department Name is not different or the new name is not valid');
              document.getElementById("editDialog").close();
            }
          }.bind(this);
  
          // Create handler
          this.addDepartment = function (event) {
            var recordAttrs = { DepartmentId: this.newDeptId(), DepartmentName: this.newDeptName() };
            this.DeptCol().create(recordAttrs, {
              wait: true,
              contentType: 'application/vnd.oracle.adf.resource+json',
              success: function (model, response) {
              },
              error: function (jqXHR, textStatus, errorThrown) {
                console.log('Error in Create: ' + textStatus);
              }
            });
          }.bind(this);
  
  
          this.serviceURL = 'http://mockrest/stable/rest/Departments';
          this.DeptCol = ko.observable();
          this.datasource = ko.observable();
  
          this.parseSaveDept = function (response) {
            return {
              DepartmentId: response['DepartmentId'],
              DepartmentName: response['DepartmentName'],
              LocationId: response['LocationId'],
              ManagerId: response['ManagerId']
            };
          };
  
          this.parseDept = function (response) {
            return {
              DepartmentId: response['DepartmentId'],
              DepartmentName: response['DepartmentName'],
              LocationId: response['LocationId'],
              ManagerId: response['ManagerId']
            };
          };
          this.Department = Model.Model.extend({
            urlRoot: this.serviceURL,
            parse: this.parseDept,
            parseSave: this.parseSaveDept,
            idAttribute: 'DepartmentId'
          });

          
  
          this.myDept = new this.Department();
          this.DeptCollection = Model.Collection.extend({
            url: this.serviceURL,
            model: this.myDept,
            comparator: "DepartmentId"
          });
  
          this.DeptCol(new this.DeptCollection());
  
          new MockRESTServer(JSON.parse(jsonData), {
            id: "DepartmentId",
            url: /^http:\/\/mockrest\/stable\/rest\/Departments(\?limit=([\d]*))?$/i,
            idUrl: /^http:\/\/mockrest\/stable\/rest\/Departments\/([\d]+)$/i
          });
          this.datasource(new CollectionDataProvider(this.DeptCol()));
        }
  
        return new viewModel();      
        //ko.applyBindings(vm, document.getElementById('mainContent'));
      }
);