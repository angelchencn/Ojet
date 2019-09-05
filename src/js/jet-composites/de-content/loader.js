/**
  Copyright (c) 2015, 2018, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(['ojs/ojcore', 'text!./de-content-view.html', './de-content-viewModel', 'text!./component.json', 'css!./de-content-styles', 'ojs/ojcomposite'],
  function(oj, view, viewModel, metadata) {
    oj.Composite.register('de-content', {
      view: view, 
      viewModel: viewModel, 
      metadata: JSON.parse(metadata)
    });
  }
);