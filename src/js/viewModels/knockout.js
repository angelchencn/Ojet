
define(['knockout'],
  function (ko) {
    console.log("KnockoutViewModel ==> 1");
    function KnockoutViewModel(first, last) {
      this.firstName = ko.observable(first);
      this.lastName = ko.observable(last);
      this.fullName = ko.pureComputed(function () {
        return this.firstName() + " " + this.lastName();
      }, this);
      console.log("KnockoutViewModel ==> 2");
      var self = this;


      self.connected = function () {
        console.log("KnockoutViewModel ==> connected");
        // Implement if needed
      };

      self.disconnected = function () {
        console.log("KnockoutViewModel ==> disconnected");
      };

      self.transitionCompleted = function () {
        console.log("KnockoutViewModel ==> transitionCompleted");
      };
    }

    return new KnockoutViewModel("Alex", "Chen");
  }
);
