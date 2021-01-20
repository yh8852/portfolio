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
  const scrollto = document.querySelector(link);
  scrollto.scrollIntoView({behavior: "smooth"})
})

const ContactMe = document.querySelector('.home__contact');
ContactMe.addEventListener('click',(event)=>{
  const contact = event.target;  
  const contact_link = contact.dataset.link;  
  console.log(contact_link)
  const ScrollToContact = document.querySelector(contact_link);
  ScrollToContact.scrollIntoView({behavior: "smooth"})
})