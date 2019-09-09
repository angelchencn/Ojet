/**
  Copyright (c) 2015, 2018, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';
define(
    ['ojs/ojcore', 'knockout', 'jquery', 'ojL10n!./resources/nls/de-content-strings', 'ojs/ojarraydataprovider', 'ojs/ojlistview'],
    function (oj, ko, $, componentStrings) {
        function DeContentModel(context) {
            var self = this;
            self.rootModel = ko.dataFor(document.getElementById('globalBody'));

            //At the start of your viewModel constructor
            var busyContext = oj.Context.getContext(context.element).getBusyContext();
            var options = { "description": "CCA Startup - Waiting for data" };
            self.busyResolve = busyContext.addBusyState(options);

            self.composite = context.element;

            self.properties = context.properties;
            self.res = componentStrings['de-content'];

            self.source = self.rootModel.selectedSource;
            self.sourceTitle = ko.observable("Select Source");
            //self.source.subscribe

            self.source.subscribe(function (newText) {

                self.sourceTitle(newText ? newText.name + " Headlines" : "Select Source");
                // reset the list
                self.news([]);

                //fetch the headlines
                $.getJSON("https://newsapi.org/v2/top-headlines?apiKey=31b0c3179f46467a92b15751618aca39&sources=" + newText.id,
                    function (data) {
                        self.news(data.articles);
                    })
            });
            //fetch the headlines
            self.news = ko.observableArray([]);
            self.dataProvider = new oj.ArrayDataProvider(self.news, { keyAttributes: "id" });

            //Once all startup and async activities have finished, relocate if there are any async activities
            self.busyResolve();
        };

        //Lifecycle methods - uncomment and implement if necessary 
        //DeContentModel.prototype.activated = function(context){
        //};

        //DeContentModel.prototype.connected = function(context){
        //};

        //DeContentModel.prototype.bindingsApplied = function(context){
        //};

        //DeContentModel.prototype.disconnect = function(context){
        //};

        //DeContentModel.prototype.propertyChanged = function(context){
        //};

        return DeContentModel;
    });