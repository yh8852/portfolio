'use strict'

// Make Navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
  }
});

// Handle scrollin when tapping on the navbar menu
const navBarMenu = document.querySelector('.navbar__menu');
navBarMenu.addEventListener('click', (event) => {

  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  navBarMenu.classList.remove('display');
  scrollIntoView(link);  
});

// Navbar Toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', ()=>{
  navBarMenu.classList.toggle('display');
})

//Handle click on "contact me "button home
const ContactMe = document.querySelector('.home__contact');
ContactMe.addEventListener('click', () => {
  scrollIntoView('#contact');
});

function scrollIntoView(selection) {
  const scrollto = document.querySelector(selection);
  scrollto.scrollIntoView({ behavior: "smooth" });
};

// Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  home.style.opacity = 1 - scrollY / homeHeight;
});

// show "arrow up" button when scrolling down
const arrowup = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight / 2) {
    arrowup.classList.add('visible');
  } else {
    arrowup.classList.remove('visible');
  };
});

// Handle click on the "arrow up" button
arrowup.addEventListener('click', () => {
  scrollIntoView('#home');
})

// show project filtering and animation
const WorkBtnContainer = document.querySelector('.work__categories');
const ProjectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
WorkBtnContainer.addEventListener('click', (event) => {
  const filter = event.target.dataset.button || event.target.parentNode.dataset.button;
  if (filter == null) {
    return;
  }

  // Remove selection from the previous item and select the new one
  const pre_active = document.querySelector('.category__btn.selected');
  const new_active = 
        event.target.nodeName ==='BUTTON' ? event.target : event.target.parentNode;
  pre_active.classList.remove('selected');
  new_active.classList.add('selected');

  ProjectContainer.classList.add('anim-out');
  ProjectContainer.classList.remove('anim-in');

  setTimeout(()=>{

    ProjectContainer.classList.remove('anim-out');
    ProjectContainer.classList.add('anim-in');
    
    projects.forEach(project => {
      if (filter === '*' || filter === project.dataset.type) {
        project.classList.remove('invisible');
      } else {
        project.classList.add('invisible');
      }
    });

  },300);
});