(function (window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function FormHandler(selector){
    console.log('enter formHandler');
    if (!selector) {
      throw new Error ('no selector provider');
    }
    this.$formElement = $(selector);
    if (this.$formElement.length ===0) {
      throw new Error('Could not find element with selector ' + selector)
    }

  }
  FormHandler.prototype.addSubmitHandler = function (fn){
    console.log ('submit handler for form');
    this.$formElement.on('submit', function (event) {
      event.preventDefault();
      //var data = $(this).serializeArray();
      var data = {};
      $(this).serializeArray().forEach(function (item){
        data[item.name] = item.value;
        console.log(item.name + ' is ' + item.value );
      })
      console.log(data);
      fn(data);
      this.reset();
      this.elements[0].focus();

    });
  };

  App.FormHandler = FormHandler;
  window.App = App;

})(window);
