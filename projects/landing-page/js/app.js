/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
const sectionsData = [
  {
    id: "section1",
    navName: "Section 1",
    element: document.querySelector("#section1"),
  },
  {
    id: "section2",
    navName: "Section 2",
    element: document.querySelector("#section2"),
  },
  {
    id: "section3",
    navName: "Section 3",
    element: document.querySelector("#section3"),
  },
  {
    id: "section4",
    navName: "Section 4",
    element: document.querySelector("#section4"),
  },
];



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const navList = document.querySelector("#navbar__list");

sectionsData.forEach((section) => {
  const newListItem = document.createElement("li");
  newListItem.innerHTML = `<a href="#${section.id}" class="menu__link">${section.navName}</a>`;
  navList.appendChild(newListItem);
});

// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active

