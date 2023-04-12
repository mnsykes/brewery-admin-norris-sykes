//button loading on the stylesearch page
const container = document.getElementById('button-container');
const existingButton = document.getElementById('existing-button');
const loadingButton = document.getElementById('loading-button');

existingButton.addEventListener('click', () => {
  loadingButton.classList.remove('d-none');
  existingButton.classList.add('d-none');
});

window.addEventListener('load', () => {
  loadingButton.classList.add('d-none');
  existingButton.classList.remove('d-none');
});