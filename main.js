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
  selectNavItem(target)

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



// 1. 모든 섹션 요소들과 메뉴 아이템들을 가지고온다. 
// 2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다.
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화시킨다.

const sectionIDs = ['#home', '#about', '#skills', '#work', '#testimonials', '#contact'];
const sections = sectionIDs.map(id =>document.querySelector(id));
const navItems = sectionIDs.map(id=>document.querySelector(`[data-link="${id}"]`));

let selectedNavIndex;
let selectedNavItem = navItems[0];

function selectNavItem(selected){
  selectedNavItem.classList.remove('active');
  selectedNavItem = selected;  
  selectedNavItem.classList.add('active');
}

function scrollIntoView(selection) {
  const scrollto = document.querySelector(selection);
  scrollto.scrollIntoView({ behavior: "smooth" });
  selectNavItem(navItems[sectionIDs.indexOf(selection)]);

};

const observerOptions={
  root:null,
  rootMargin: '0px',
  threshold : 0.3
};

const observerCallback = (entries, observer) => {
  entries.forEach(entry =>{
    if (!entry.inIntersecting && entry.intersectionRatio > 0){
      const index = sectionIDs.indexOf(`#${entry.target.id}`);
      
        if (entry.boundingClientRect.y < 0){
            // 스크롤이 아래로 되어서 페이지가 올라옴
            selectedNavIndex = index +1;
        }else{
            selectedNavIndex = index -1;
        }
        
    };
  });
};
const observer = new IntersectionObserver(observerCallback, observerOptions);

sections.forEach(section => observer.observe(section));

window.addEventListener('wheel', ()=>{
  console.log(window.scrollY+window.innerHeight)
  console.log(document.body.clientHeight)

  if (window.scrollY === 0 ){
    selectedNavIndex = 0;
  }else if(Math.round(window.scrollY+window.innerHeight) >= document.body.clientHeight){    
    selectedNavIndex = navItems.length-1;
  }  
  selectNavItem(navItems[selectedNavIndex]);
});
