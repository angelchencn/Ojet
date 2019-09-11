
define(['knockout',
  'ojs/ojmodule-element-utils',
  'ojs/ojknockout',
  'ojs/ojnavigationlist'
],
  function (ko, ModuleElementUtils) {
    function ComponentsViewModel() {
      this.currentModule = ko.observable("dataBinding");
      this.ModuleElementUtils = ModuleElementUtils;
      this.listItems = [
        {
          id: "dataBinding",
          label: "Data Binding",
          disabled: false
        },
        {
          id: "layout",
          label: "Layout",
          disabled: false
        },
        {
          id: "cookbook",
          label: "Cookbook",
          disabled: false
        },
        {
          id: "stylelab",
          label: "Style Lab",
          disabled: false
        },
        {
          id: "Support",
          label: "Support",
          disabled: false
        }
      ];
      
    }
    return new ComponentsViewModel();
  }
);
