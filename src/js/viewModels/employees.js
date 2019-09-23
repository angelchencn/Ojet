define(['knockout', 'ojs/ojmodule-element-utils', 'ojs/ojmodule-element', 'ojs/ojknockout', 'ojs/ojbutton'],
  function (ko, ModuleElementUtils) {
    function TestViewModel() {
      //moduleElementUtils.createConfig();
      this.currentModule = ko.observable("employees");
      this.ModuleElementUtils = ModuleElementUtils;

    }
    return new TestViewModel();
    //Bootstrap.whenDocumentReady().then(function () {
    //  ko.applyBindings(new SimpleModuleModel(), document.getElementById('moduleDemo'));
    //});
  });