
define(['knockout'],
  function (ko) {
    console.log("KnockoutViewModel ==> 1");
    function KnockoutViewModel(first, last) {
      this.firstName = ko.observable(first);
      this.lastName = ko.observable(last);
      this.fullName = ko.pureComputed(function () {
        console.log("KnockoutViewModel ==> 2");
        return this.firstName() + " " + this.lastName();
      }, this).extend({ notify: 'always' });

      ////////////////////////////////////////
      this.personName = ko.observable("");
      this.personName.subscribe(function (oldValue) {
        console.log("The person's previous name is " + oldValue);
        //}, null, "beforeChange");
      }, null, "change");
      //this.personName.extend({ notify: 'always' });

      ////////////////////////////////////////
      //ko.when(function () {
      //  return this.personName() !== undefined;
      //}, function (result) {
      //  this.isInitialized(true);
      //});
      ////////////////////ObservableArray////////////////////
      var items = ["Alpha", "Beta", "Gamma"];
      this.items = ko.observableArray(items);
      this.itemToAdd = ko.observable("");
      this.addItem = function () {
        if (this.itemToAdd() != "") {
          this.items.push(this.itemToAdd()); // Adds the item. Writing to the "items" observableArray causes any associated UI to update.
          this.itemToAdd(""); // Clears the text box, because it's bound to the "itemToAdd" observable
          console.log("The length of the array is " + items.length);
          console.log("The first element is " + items[0]);
          console.log("The Beta index is " + items.indexOf("Beta"));
        }
      }.bind(this);  // Ensure that "this" is always this view model

      //////////////////Writable computed observables//////////////////////
      this.firstName1 = ko.observable('Planet');
      this.lastName1 = ko.observable('Earth');

      this.fullName1 = ko.pureComputed({
        read: function () {
          return this.firstName1() + " " + this.lastName1();
        },
        write: function (value) {
          var lastSpacePos = value.lastIndexOf(" ");
          if (lastSpacePos > 0) { // Ignore values with no space character
            this.firstName1(value.substring(0, lastSpacePos)); // Update "firstName"
            this.lastName1(value.substring(lastSpacePos + 1)); // Update "lastName"
          }
        },
        owner: this
      });

      //////////////////Selecting/deselecting all items//////////////////////
      this.produce = ['Apple', 'Banana', 'Celery', 'Corn', 'Orange', 'Spinach'];
      this.selectedProduce = ko.observableArray(['Corn', 'Orange']);
      this.selectedAllProduce = ko.pureComputed({
        read: function () {
          // Comparing length is quick and is accurate if only items from the
          // main array are added to the selected array.
          return this.selectedProduce().length === this.produce.length;
        },
        write: function (value) {
          this.selectedProduce(value ? this.produce.slice(0) : []);
        },
        owner: this
      });

      //////////////////Value Converter//////////////////////
      this.price = ko.observable(25.99);
      this.formattedPrice = ko.pureComputed({
        read: function () {
          return '$' + this.price().toFixed(2);
        },
        write: function (value) {
          // Strip out unwanted characters, parse as float, then write the 
          // raw data back to the underlying "price" observable
          value = parseFloat(value.replace(/[^\.\d]/g, ""));
          this.price(isNaN(value) ? 0 : value); // Write to underlying storage
        },
        owner: this
      });
      //////////////////Filter and Validating user input//////////////////////
      this.acceptedNumericValue = ko.observable(123);
      this.lastInputWasValid = ko.observable(true);

      this.attemptedValue = ko.pureComputed({
        read: this.acceptedNumericValue,
        write: function (value) {
          if (isNaN(value))
            this.lastInputWasValid(false);
          else {
            this.lastInputWasValid(true);
            this.acceptedNumericValue(value); // Write to underlying storage
          }
        },
        owner: this
      });

      //////////////////Binding//////////////////////
      this.shouldShowMessage = ko.observable(true);
      this.shouldShowMessage(true); // ... now it's visible again

      this.myMessage = "Hello, world";
      this.price = ko.observable(52.95);
      this.priceRating = ko.pureComputed(function(){
          return this.price > 50 ? "expensive" : "affordable";
      });

    }

    return new KnockoutViewModel("Alex", "Chen");
  }
);
