/**
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

const navbar = document.getElementById("navbar__list");
const sections = document.querySelectorAll("section");

/**
 * Helper Functions
 */

// Check if an element is in the viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Main Functions
 */

// Build the navigation menu
function buildNavbar() {
  for (let section of sections) {
    const liElement = document.createElement('li');
    liElement.className = 'menu__link';
    liElement.dataset.nav = section.id;
    liElement.innerText = section.dataset.nav;
    navbar.appendChild(liElement);
  }
}

// Add class 'active' to section and navigation link when near top of viewport
function setActiveSection() {
  window.addEventListener("scroll", function(event) {
    for (let section of sections) {
      if (isInViewport(section)) {
        section.classList.add("your-active-class");
        const navItem = navbar.querySelector(`[data-nav="${section.id}"]`);
        navItem.classList.add("active");
      } else {
        section.classList.remove("your-active-class");
        const navItem = navbar.querySelector(`[data-nav="${section.id}"]`);
        navItem.classList.remove("active");
      }
    }
  });
}

// Scroll to section on link click
function setScrollTo() {
  navbar.addEventListener("click", function (event) {
    if (event.target.tagName === 'LI') {
      const targetSection = document.getElementById(event.target.dataset.nav);
      
      // Scroll to section
      targetSection.scrollIntoView({ behavior: 'smooth' });

      // Remove active class from all navbar list items
      const navbarLinks = navbar.querySelectorAll('li');
      for (let link of navbarLinks) {
        link.classList.remove('active');
      }

      // Add active class to the clicked navbar list item
      event.target.classList.add('active');
    }
  });
}

/**
 * Events
 */

// Build menu 
buildNavbar();
// Scroll to section on link click
setScrollTo();
// Set sections and navigation links as active
setActiveSection();