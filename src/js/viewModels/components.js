
define(['knockout',
  'ojs/ojknockout',
  'ojs/ojnavigationlist'
],
  function (ko) {
    function ComponentsViewModel() {
      this.currentModule = ko.observable("framework");
      this.listItems = [
        {
          id: "framework",
          label: "Framework",
          disabled: false
        },
        {
          id: "gettingstarted",
          label: "Getting Started",
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
