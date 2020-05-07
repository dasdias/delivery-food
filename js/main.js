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

const getData = async function(url) {
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}!`)
	}
	return await response.json();
};



const toggleModal = function () {
	modal.classList.toggle("is-open");
};

const toogleModalAuth = function() {
	modalAuth.classList.toggle('is-open');
};
function returnMain() {
	containerPromo.classList.remove('hide');
	restaurants.classList.remove('hide');
	menu.classList.add('hide');
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
		returnMain();
	}
	// console.log('Авторизован');
	buttonAuth.style.display = 'none';
	buttonOut.style.display = 'block';
	userName.style.display = 'inline';
	userName.textContent = login;

	buttonOut.addEventListener('click', logOut); 
}
function notAuthorized() {
	// console.log('Не авторизован');

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

function createCardRestaraunt(restaurant) {
	const { image,
			kitchen,
			name,
			price,
			stars,
			products,
			time_of_delivery: timeOfDelivery
			 } = restaurant;
	const card = `
		<a href="#!" class="card card-restaurant" data-products="${products}">
			<img src="${image}" alt="image" class="card-image">
			<div class="card-text">
				<div class="card-heading">
					<h3 class="card-title">${name}</h3>
					<span class="card-tag tag">${timeOfDelivery} мин</span>
				</div>
				<div class="card-info">
					<div class="rating">
						${stars}
					</div>
					<div class="price">От ${price} ₽</div>
					<div class="category">${kitchen}</div>
				</div>
			</div>
		</a>
	`;

	cardsRestaurants.insertAdjacentHTML('beforeend', card);


}

function createCardGood({ description, id, image, price, name }) {
	
	const card = document.createElement('div');
	card.className = 'card';
	// card.setAttribute('id', id);
	card.insertAdjacentHTML('beforeend', `
			<img src="${image}" alt="image" class="card-image"/>
			<div class="card-text">
				<div class="card-heading">
					<h3 class="card-title card-title-reg">${name}</h3>
				</div>
				<div class="card-info">
					<div class="ingredients">${description}</div>
				</div>
				<div class="card-buttons">
					<button class="button button-primary button-add-cart" data-cart= "${id}">
						<span class="button-card-text">В корзину</span>
						<span class="button-cart-svg"></span>
					</button>
					<strong class="card-price-bold">${price} ₽</strong>
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
			// console.log(restaurant);
			getData(`./db/${restaurant.dataset.products}`).then(function (data) {
				data.forEach(createCardGood);
				console.log(data);
			});			
			
		} else {
			toogleModalAuth();
		}
	} 

}

function init() {
	getData('./db/partners.json').then(function (data) {
		data.forEach(createCardRestaraunt);
		console.log(data);
	});

	cartButton.addEventListener("click", toggleModal);
	closeModal.addEventListener("click", toggleModal);

	cardsRestaurants.addEventListener('click', openGoods);

	logo.addEventListener('click', returnMain);


	checkAuth();


	var mySwiper = new Swiper('.swiper-container', {
		// Optional parameters
		// init: true,
		// direction: 'vertical',
		// slidesPerColumn: 1,
		slidesPerView: 1,
		// slidesPerColumnFill: 'row',
		loop: true,
		speed: 400,
		autoplay: {
			delay: 5000,
		},
	});
}
init();