
define(['knockout'],
  function (ko) {

    function AboutViewModel() {
      //Databind
      this.firstName = ko.observable("Bert");
      this.firstNameCaps = ko.pureComputed(function () {
        return this.firstName().toUpperCase();
      }, this);

      //Component
      ko.components.register("userName", {
        viewModel: function (params) {
          this.firstName = ko.observable('Bert');
          this.firstNameCaps = ko.pureComputed(function () {
            return this.firstName().toUpperCase();
          }, this);
        },
        template:
          "<p>First name: <input data-bind='value: firstName' /></p>\n\
           <p>First name capitalized: <strong data-bind='text: firstNameCaps'></strong></p>"
      });

      //HTML Template
      ko.components.register("htmlTemplate", {
        viewModel: function (params) {
          this.firstName = ko.observable('Bert');
          this.firstNameCaps = ko.pureComputed(function () {
            return this.firstName().toUpperCase();
          }, this);
        },
        template: {require: 'text!views/htmlTemplate.html'}
      });
    }

    return new AboutViewModel();
  }
);
