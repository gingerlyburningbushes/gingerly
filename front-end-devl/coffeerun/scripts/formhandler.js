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
      fn(data).then(function(){
        this.reset();
        this.elements[0].focus();
      }.bind(this));

    });
  };

  FormHandler.prototype.addInputHandler = function (fn) {
    console.log('enter setting input handler for the form');
    this.$formElement.on('input', '[name="emailAddress"]', function(event) {

      var emailAddress = event.target.value;
      //console.log('Input Email Address...' + emailAddress);
      //console.log(fn(emailAddress));

      var message = '';

      if (fn(emailAddress)) {
        event.target.setCustomValidity('');
      }else {
        message = emailAddress + ' is not a valid email address';
        event.target.setCustomValidity(message);

      }

    })
  }


  App.FormHandler = FormHandler;
  window.App = App;

})(window);