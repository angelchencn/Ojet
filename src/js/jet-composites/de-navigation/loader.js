/**
  Copyright (c) 2015, 2018, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(['ojs/ojcore', 'text!./de-navigation-view.html', './de-navigation-viewModel', 'text!./component.json', 'css!./de-navigation-styles', 'ojs/ojcomposite'],
  function(oj, view, viewModel, metadata) {
    oj.Composite.register('de-navigation', {
      view: view, 
      viewModel: viewModel, 
      metadata: JSON.parse(metadata)
    });
  }
);