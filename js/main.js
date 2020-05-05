'use strict';

const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".close");



function toggleModal() {
  modal.classList.toggle("is-open");
}

cartButton.addEventListener("click", toggleModal);
closeModal.addEventListener("click", toggleModal);




// day-1

const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');
let login = localStorage.getItem('gloDelivery');

function toogleModalAuth() {
  modalAuth.classList.toggle('is-open');
}


function authorized() {
  function logOut() {
    login = null;
    localStorage.removeItem('gloDelivery');
    buttonAuth.style.display = '';
    buttonOut.style.display = '';
    userName.style.display = '';
    buttonOut.removeEventListener('click', logOut); 

    checkAuth();
  }
  console.log('Авторизован');
  buttonAuth.style.display = 'none';
  buttonOut.style.display = 'block';
  userName.style.display = 'inline';
  userName.textContent = login;

  buttonOut.addEventListener('click', logOut); 
}
function notAuthorized() {
  console.log('Не авторизован');

  function logIn(event) {
    event.preventDefault();
    login = loginInput.value.trim();
    if (!login) {
      loginInput.style.borderColor = 'red';
      return;
    } else {
      loginInput.style.borderColor = '';
    }
    

    localStorage.setItem('gloDelivery', login);
    toogleModalAuth();
    // console.log('Логин');
    buttonAuth.removeEventListener('click', toogleModalAuth);
    closeAuth.removeEventListener('click', toogleModalAuth);
    logInForm.removeEventListener('submit', logIn);
    logInForm.reset();
    checkAuth();
  }


  buttonAuth.addEventListener('click', toogleModalAuth);
  closeAuth.addEventListener('click', toogleModalAuth);
  logInForm.addEventListener('submit', logIn);
}

function checkAuth() {
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }
}
checkAuth();