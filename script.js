const menuBtn = document.querySelector(".header__menu-btn");
const closeBtn = document.querySelector('.close-button');
const navMenu = document.querySelector('.header__nav');

menuBtn.addEventListener('click', () => {

  if(menuBtn.getAttribute('aria-expanded') === 'true'){
    fecharMenu();
  } else {
    abrirMenu();
    console.log(document)
    setTimeout(() => {
      document.addEventListener("click", fecharMenu)
    }, 100)
  }

  document.removeEventListener("click", fecharMenu);
})

function abrirMenu(){
  menuBtn.setAttribute('aria-expanded', 'true');
    navMenu.classList.add('active-menu');
  menuBtn.classList.add("active-menu-btn")
    console.log('abrir menu')
}

function fecharMenu(){
  menuBtn.setAttribute('aria-expanded', 'false');
  navMenu.classList.remove('active-menu');
  menuBtn.classList.remove("active-menu-btn")
  
}
