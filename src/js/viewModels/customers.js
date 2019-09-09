/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your viewModel code goes here
 */
define(["require", "exports", "ojs/ojknockout"], function (require, exports) {
    "use strict";
    /**
     * CustomersViewModel module which uses two auxiliar modules for list / detail visualization of Customers
     * @author Daniel Merchan Garcia
     * @version 6.2.0
     */
    class CustomersViewModel {
        /**
         * Default Constructor of the Customers View Model
         * It is used as a container / wrapper of the List / Detail Modules
         */
        constructor() {
            let self = this;
            // Router
        }
        // Static Methods
        static initializeCustomers() {
            CustomersViewModel.customers = [{ id: 0, name: 'Paco', age: 22 }, { id: 1, name: 'Eva', age: 30 }];
        }
        // Custom Functions
        loadCustomerModule(name) {
        }
        /*
         * Optional ViewModel method invoked after the View is inserted into the
         * document DOM.  The application can put logic that requires the DOM being
         * attached here.
         * This method might be called multiple times - after the View is created
         * and inserted into the DOM and after the View is reconnected
         * after being disconnected.
         */
        connected() {
            // Implement if needed
        }
        ;
        /**
         * Optional ViewModel method invoked after the View is disconnected from the DOM.
         */
        disconnected() {
        }
        ;
        /**
         * Optional ViewModel method invoked after transition to the new View is complete.
         * That includes any possible animation between the old and the new View.
         */
        transitionCompleted() {
            // Implement if needed
        }
        ;
    }
    // Initialize static content
    CustomersViewModel.initializeCustomers();
    return CustomersViewModel;
});
//# sourceMappingURL=Customers.js.map