document.getElementsByClassName("menu__btn-hamburger")[0].onclick = function() {
  document.getElementsByClassName("menu__list")[0].classList.toggle("hidden");
  document.getElementsByClassName("menu__btn-hamburger")[0].classList.toggle("cross");
};
