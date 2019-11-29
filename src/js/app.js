console.log('Here I am');
console.log("nope");

const toggleButton = document.getElementById('toggle-button');
const navbarLinks = document.getElementById('dropdown');

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('visible')
})