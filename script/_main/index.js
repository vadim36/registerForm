import {
   NO_LOGIN_ERROR,
   NO_PASSWORD_ERROR,
   SHORT_PASSWORD_ERROR,
   LONG_PASSWORD_ERROR,
   SIMPLE_PASSWORD_ERROR} from '../_modules/validation_errors.js';
import {sendingRequest} from "../_modules/send_request_fn.js";

//*Валидация
const registrationForm = document.forms.registrationForm;
const registrationFormLoginField = registrationForm.formRegistrationLogin;
const registrationFormPasswordField = registrationForm.formRegistrationPassword;
const registrationFormValidationErrorModal =
   document.querySelector('.form-registration__modal-validation');
const registrationFormValidationErrorModalButtonClose =
   document.querySelector('.modal-validation__button-close');

let registrationFormLoginFieldValue = registrationFormLoginField.value;
let registrationFormPasswordFieldValue = registrationFormPasswordField.value;

registrationFormLoginField.addEventListener('input', event => {
   registrationFormLoginFieldValue = event.target.value;
});

registrationFormPasswordField.addEventListener('input', event => {
   registrationFormPasswordFieldValue = event.target.value;
});

registrationFormValidationErrorModalButtonClose.onclick = () => {
   registrationFormValidationErrorModal.close();
}

registrationForm.onsubmit = event => {
   const errorsArray = [];

   registrationFormValidationErrorModal.querySelector('ul').innerHTML = '';

   if (!registrationFormLoginFieldValue) {
      event.preventDefault();
      errorsArray.push(NO_LOGIN_ERROR);
   }
   if (!registrationFormPasswordFieldValue) {
      event.preventDefault();
      errorsArray.push(NO_PASSWORD_ERROR);
   }
   if (registrationFormPasswordFieldValue.length > 0
      && registrationFormPasswordFieldValue.length < 6) {
      event.preventDefault();
      errorsArray.push(SHORT_PASSWORD_ERROR);
   }
   if (registrationFormPasswordFieldValue.length > 20) {
      event.preventDefault();
      errorsArray.push(LONG_PASSWORD_ERROR);
   }
   if (registrationFormPasswordFieldValue === 'password' ||
      registrationFormPasswordFieldValue === 'Password' ||
      registrationFormPasswordFieldValue === 'abc' ||
      registrationFormPasswordFieldValue === 'Abc' ||
      registrationFormPasswordFieldValue === '123') {
      event.preventDefault();
      errorsArray.push(SIMPLE_PASSWORD_ERROR);
   }

   if (errorsArray.length > 0) {
      errorsArray.forEach(element => {
         const registrationFormValidationErrorModalListItem =
            document.createElement('li');
         registrationFormValidationErrorModalListItem.innerHTML = element;
         registrationFormValidationErrorModal
            .querySelector('ul')
            .append(registrationFormValidationErrorModalListItem);
      });

      registrationFormValidationErrorModal.showModal();
   }

   const formData = new FormData(registrationForm);
   sendingRequest('https://jsonplaceholder.typicode.com/users', 'POST', formData)
      .then(response => console.log(response));
}