import { createElement } from './newElements'
import { handleLogin } from './auth.js'

// Open form
export const openForm = btn => {
  btn.addEventListener('click', function (e) {
    const popupId = this.dataset.target;
    const popup = document.querySelector('#' + popupId)
    popup.style.display = 'block';
    popup.querySelector('input').focus();
  })
}

// Close form
export const closeForm = btn => {
  btn.addEventListener('click', function (e) {
    const popupId = this.parentElement.parentElement.id;
    document.querySelector('#' + popupId).style.display = 'none';
  })
}

// Submit form
export const submitForm = form => {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    this.parentElement.style.display = 'none';
    if (this.id === 'variables-form' || this.id === 'equations-form') {
      createElement(form);
    } else if (this.id == 'login-form') {
      handleLogin(form);
    }
    this.reset();
  })
}
