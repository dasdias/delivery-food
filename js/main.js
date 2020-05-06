'use strict';

const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".close");

// day-1

const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');
let login = localStorage.getItem('gloDelivery');

// day-2

const cardsRestaurants = document.querySelector('.cards-restaurants');
const containerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
const cardsMenu = document.querySelector('.cards-menu');

function toggleModal() {
	modal.classList.toggle("is-open");
}

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
			loginInput.setAttribute('placeholder', 'Заполните это поле');
			loginInput.classList.add('err-msg');
			return;
		} else {
			loginInput.removeAttribute('placeholder');
			loginInput.classList.remove('err-msg');
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

function createCardRestaraunt() {
	const card = `
		<a href="#!" class="card card-restaurant">
			<img src="img/pizza-plus/preview.jpg" alt="image" class="card-image">
			<div class="card-text">
				<div class="card-heading">
					<h3 class="card-title">Пицца плюс</h3>
					<span class="card-tag tag">50 мин</span>
				</div>
				<div class="card-info">
					<div class="rating">
						4.5
					</div>
					<div class="price">От 111900 ₽</div>
					<div class="category">Пицца</div>
				</div>
			</div>
		</a>
	`;

	cardsRestaurants.insertAdjacentHTML('beforeend', card);


}

function createCardGood() {
	const card = document.createElement('div');
	card.className = 'card';
	card.insertAdjacentHTML('beforeend', `
			<img src="img/pizza-plus/pizza-classic.jpg" alt="image" class="card-image"/>
			<div class="card-text">
				<div class="card-heading">
					<h3 class="card-title card-title-reg">Пицца Классика</h3>
				</div>
				<div class="card-info">
					<div class="ingredients">Соус томатный, сыр «Моцарелла», сыр «Пармезан», ветчина, салями,
						грибы.
					</div>
				</div>
				<div class="card-buttons">
					<button class="button button-primary button-add-cart">
						<span class="button-card-text">В корзину</span>
						<span class="button-cart-svg"></span>
					</button>
					<strong class="card-price-bold">510 ₽</strong>
				</div>
			</div>
	`);

	cardsMenu.insertAdjacentElement('beforeend', card);
}

function openGoods(event) {
	// event.preventDefault();
	const target = event.target;
	const restaurant = target.closest('.card-restaurant');
	if (restaurant) {
		if (login) {
			cardsMenu.textContent = '';

			containerPromo.classList.add('hide');
			restaurants.classList.add('hide');
			menu.classList.remove('hide');
			console.log(restaurant);

			createCardGood();
		} else {
			toogleModalAuth();
		}
	} 

}

cartButton.addEventListener("click", toggleModal);
closeModal.addEventListener("click", toggleModal);

cardsRestaurants.addEventListener('click', openGoods); 
logo.addEventListener('click', function () {
	containerPromo.classList.remove('hide');
	restaurants.classList.remove('hide');
	menu.classList.add('hide');  
}); 


checkAuth();
createCardRestaraunt();