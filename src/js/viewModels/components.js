
define(['knockout',
  'ojs/ojbootstrap',
  'ojs/ojknockout',
  'ojs/ojnavigationlist'
],
  function (ko) {
    console.log("ComponentsViewModel ==> 1");
    function ComponentsViewModel() {
      console.log("ComponentsViewModel ==> 2");

      this.listItems = [
        {
          id: "home",
          label: "Home",
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
          disabled: true
        },
        {
          id: "Support",
          label: "Support",
          disabled: false
        }
      ];
      this.selectedItem = ko.observable('home');

      self.connected = function () {
        console.log("ComponentsViewModel ==> connected");
      };

      self.disconnected = function () {
        console.log("ComponentsViewModel ==> disconnected");
      };

      self.transitionCompleted = function () {
        console.log("ComponentsViewModel ==> transitionCompleted");
      };
    }

    return new ComponentsViewModel();
  }
);
