(function(){
	'use strict';

	var form = $('#signup-form');
	var submitButton = $('#btn_submit');
	var termsCb = $('#cb_terms-services');
	var passwordSwitch = $('#cb_psw-show-hide');
	var passwordInput = $('#password');
	var emailRegEx = new RegExp(
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'i');
	var lowStrength = new RegExp(/^[a-zA-Z]+$/);
	var mediumStrength = new RegExp(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/, 'i');
	var highStrength = new RegExp(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)(?=.*\d)(?=.*(_|[^\w])).+$/);

	/*
	 * Listener binding.
	 */
	submitButton.click(formSubmit);
	passwordSwitch.change(alterPasswordInput);
	passwordInput.keyup(checkPswStrength);

	/*
	 * Triggeres on submit button click.
	 */	
	 function formSubmit (event) {
		event.preventDefault();
		
		form.serializeArray().forEach(function(form_elem){
			var inputGroup = getGroupParrent($('input[name="' + form_elem.name + '"]'));
			var messageElem = $(inputGroup).find('span.message');
            
            // Show the message if the input is empty.
            if (form_elem.value == '') {
            	messageElem.css('display', 'inline-flex');
            } else {
				messageElem.css('display', 'none');
				// Validate email and show the message.
				if (form_elem.name == 'email') {
					if (!validateEmail(form_elem.value)) messageElem.css('display', 'inline-flex').text('Invalid Email!');
					if (validateEmail(form_elem.value)) messageElem.css('display', 'none').text('muss ausgefullt werden');
				}
            }
        });

		// Validate if the terms and services are checked.
        if (!termsCb.prop('checked')) {
        	$(getGroupParrent(termsCb)).find('span.message').css('display', 'inline-flex');
        } else {
			$(getGroupParrent(termsCb)).find('span.message').css('display', 'none');
        }
	}

	/*
	 * Switches password input type from 'text' to 'password' depending on parameter.
	 */
	function alterPasswordInput (event) {
		var cbFor = $(event.target).attr('for');

		if ($(event.target).prop('checked')) {
			$(getGroupParrent(event.target)).find('input[name="' + cbFor + '"]').attr('type', 'text');
		} else {
			$(getGroupParrent(event.target)).find('input[name="' + cbFor + '"]').attr('type', 'password');
		}
	}

	function checkPswStrength (event) {

		removeAllClasses(
			$(getGroupParrent(event.target)).find('.strength-indicator')[0], 
			['strength-indicator--low', 'strength-indicator--medium', 'strength-indicator--high']
		);

		if (lowStrength.test(event.target.value))
			$(getGroupParrent(event.target)).find('.strength-indicator')[0].classList.add('strength-indicator--low');

		if (mediumStrength.test(event.target.value))
			$(getGroupParrent(event.target)).find('.strength-indicator')[0].classList.add('strength-indicator--medium');

		if (highStrength.test(event.target.value))
			$(getGroupParrent(event.target)).find('.strength-indicator')[0].classList.add('strength-indicator--high');
	}

	/*
	 * Returns form-group element, which is the parrent of one set of inputs.
	 */
	function getGroupParrent (element) {
		return $(element).parents('.form-group')[0];
	}

	/*
	 * Validates email against declared regexp.
	 */
	function validateEmail (email) {
		return emailRegEx.test(email);
	}

	function removeAllClasses (element, classes) {
		classes.forEach(function(element_class){
			element.classList.remove(element_class);
		});
	}
	
})();