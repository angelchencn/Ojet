define(['knockout', 'ojs/ojmodule-element-utils', 'ojs/ojmodule-element', 'ojs/ojknockout', 'ojs/ojbutton'],
  function (ko, ModuleElementUtils) {
    function TestViewModel() {
      //moduleElementUtils.createConfig();
      console.log("111");
      this.currentModule = ko.observable("second");
      console.log("222");
      this.ModuleElementUtils = ModuleElementUtils;
      console.log("333");

    }
    return new TestViewModel();
    //Bootstrap.whenDocumentReady().then(function () {
    //  ko.applyBindings(new SimpleModuleModel(), document.getElementById('moduleDemo'));
    //});
  });