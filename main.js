'use strict'

// Make Navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', ()=>{  
  if (window.scrollY>navbarHeight){
    navbar.classList.add('navbar--dark');
  }else{
    navbar.classList.remove('navbar--dark');
  }
});

// Handle scrollin when tapping on the navbar menu
const navBarMenu = document.querySelector('.navbar__menu');
navBarMenu.addEventListener('click', (event)=>{
  
  const target = event.target;
  const link = target.dataset.link;
  if (link == null){
    return;    
  }    
  scrollIntoView(link);
});

//Handle click on "contact me "button home
const ContactMe = document.querySelector('.home__contact');
ContactMe.addEventListener('click',()=>{
  scrollIntoView('#contact');  
});

function scrollIntoView(selection){
  const scrollto = document.querySelector(selection);
  scrollto.scrollIntoView({behavior: "smooth"});
};

// Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', ()=>{
  home.style.opacity = 1- scrollY / homeHeight;
});
