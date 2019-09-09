/**
  Copyright (c) 2015, 2018, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';
define(
    ['ojs/ojcore', 'knockout', 'jquery', 'ojL10n!./resources/nls/de-navigation-strings', 'ojs/ojselectcombobox', 'ojs/ojarraydataprovider'],
    function (oj, ko, $, componentStrings) {

        function DeNavigationModel(context) {
            var self = this;
            self.rootModel = ko.dataFor(document.getElementById('globalBody'));

            //At the start of your viewModel constructor
            var busyContext = oj.Context.getContext(context.element).getBusyContext();
            var options = { "description": "CCA Startup - Waiting for data" };
            self.busyResolve = busyContext.addBusyState(options);

            self.composite = context.element;

            //Example observable
            self.messageText = ko.observable('Loading Sources...');
            self.showLoading = ko.observable(true)

            self.properties = context.properties;
            self.res = componentStrings['de-navigation'];

            self.sources = ko.observableArray([])

            // In mapfields, map "name" to "label" and "id" to "value"
            var mapFields = function (item) {
                var data = item['data'];
                var mappedItem = {};
                mappedItem['data'] = {};
                mappedItem['data']['label'] = data['name'];
                mappedItem['data']['value'] = data['id'];
                mappedItem['metadata'] = { 'key': data['id'] };
                return mappedItem;
            };
            var dataMapping = { 'mapFields': mapFields };

            var arrayDataProvider = new oj.ArrayDataProvider(self.sources, { keyAttributes: 'id' });
            self.dataProvider = new oj.ListDataProviderView(arrayDataProvider, { 'dataMapping': dataMapping });

            // self.dataProvider = new oj.ArrayDataProvider(self.sources, { keyAttributes: "id" })
            self.selected = ko.observable("")

            // update the source upon change to selected
            self.selected.subscribe(function (newText) {
                let found = ko.utils.arrayFirst(self.sources(), function (item) {
                    return item.id === newText;
                });
                self.rootModel.selectedSource = found;
                console.log("111>>>" + self.selected);
                console.log("222>>>" + found);
            });

            $.getJSON("https://newsapi.org/v2/sources?apiKey=31b0c3179f46467a92b15751618aca39",
                function (data) {
                    self.sources(data.sources);
                    self.showLoading(false)
                    self.selected(data.sources[0].id);
                });
            //Once all startup and async activities have finished, relocate if there are any async activities
            self.busyResolve();
        };

        return DeNavigationModel;
    });