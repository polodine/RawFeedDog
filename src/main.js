var opacityBlock = document.querySelector('.opacity');
var aside = document.querySelector('.aside');
var headerButton = document.querySelector('.header__button');
var asideButton = document.querySelector('.aside__button');
var page = document.querySelector('.page');
var pageDown = document.querySelector('.page-down__text');
window.onload = function(event) {
	headerButton.addEventListener('click', function(event) {
		if (!aside.classList.contains('aside_visible')) {
			aside.classList.add('aside_visible');
			opacityBlock.style.zIndex = 1000;
			opacityBlock.style.opacity = 0.5;
//			document.querySelector('.main').style.overflowY = 'hidden';
			aside.style.transform = 'translate(-100%, 0)';
			aside.style.WebkitTransform = 'translate(-100%, 0)';
		}
	});
	asideButton.addEventListener('click', function(event) {
		if (aside.classList.contains('aside_visible'))
			aside.classList.remove('aside_visible');
			opacityBlock.style.zIndex = 0;
			opacityBlock.style.opacity = 0;
//			document.querySelector('.main').style.overflowY = 'auto';
			aside.style.transform = 'translate(0, 0)';
			aside.style.WebkitTransform = 'translate(0, 0)';
	});
	if (pageDown) {
		pageDown.addEventListener('click', function(event) {
			document.querySelectorAll('.page')[1].scrollIntoView({block: 'end', behavior: 'smooth'});
		});
	}
	if (opacityBlock)
		opacityBlock.addEventListener('click', opacityClick);
}

function opacityClick() {
	asideButton.click();
}
