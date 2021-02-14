import { createElement } from './newElements'
import { handleLogin, handleSignup } from './auth.js'

function resetFormErrors() {
  document.querySelectorAll('.auth-error').forEach(node => node.remove());
}

function resetForm(form) {
  resetFormErrors();
  form.reset();
}

function closeForm(form) {
  resetForm(form);
  form.parentElement.style.display = 'none';
}

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
export const cancelForm = btn => {
  btn.addEventListener('click', function (e) {
    closeForm(this.parentElement);
  })
}


// Submit form
export const submitForm = form => {

  form.addEventListener('submit', async function (e) {

    // resetForm();
    e.preventDefault();

    const formElements = this.elements;
    const submitBtn = formElements[formElements.length - 1];
    submitBtn.classList.add('disabled');

    let error = false;
    if (this.id === 'variables-form' || this.id === 'equations-form') {
      createElement(form);
    } else if (this.id == 'login-form') {
      error = await handleLogin(form);
    } else if (this.id == 'signup-form') {
      error = await handleSignup(form);
    }
    submitBtn.classList.remove('disabled');
    if (error) {
      resetFormErrors()
      const p = document.createElement('p');
      p.append(document.createTextNode(error));
      p.classList.add('auth-error');
      submitBtn.before(p);
    } else {
      closeForm(this);
    }
  })
}
