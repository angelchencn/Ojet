define(['ojs/ojmodel'], function(){
    var Employee = oj.Model.extend({
      urlRoot: 'http://localhost:9090/rest/employees',
    });
  
    return Employee;
  });