const input = document.querySelector('.input-login');
const button = document.querySelector('.button-submit');
const form = document.querySelector('.login-form');

const inputValidation = ({ target }) => {
  if (target.value.length > 2) {
    button.removeAttribute('disabled');
    return;
  }
  button.setAttribute('disabled', '');
};

const formSubmit = (event) => {
  event.preventDefault();
  localStorage.setItem('username', input.value);
  window.location = 'pages/game.html';
};

input.addEventListener('input', inputValidation);
form.addEventListener('submit', formSubmit);