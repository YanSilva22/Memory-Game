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

document.addEventListener('DOMContentLoaded', () => {
  const popup = document.getElementById('popup-som');
  const btnAceitar = document.getElementById('aceitar-som');
  const btnRecusar = document.getElementById('recusar-som');
  const audio = document.getElementById('audio-jogo');

  btnAceitar.addEventListener('click', () => {
    audio.play();
    localStorage.setItem('somAtivado', 'true');
    popup.style.display = 'none';
  });

  btnRecusar.addEventListener('click', () => {
    popup.style.display = 'none';
  });
});