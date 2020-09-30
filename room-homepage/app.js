const controls = document.querySelectorAll('.control');
const heroImg = document.querySelector('.hero__photo img');
const heroPanels = document.querySelectorAll('.hero__panel');
const toggle = document.querySelector('#theme-toggle');
const nav = document.querySelector('.nav');
const mobileNav = document.querySelector('.mobile-nav');
const openMenu = document.querySelector('.nav__open-menu');
const closeMenu = document.querySelector('.nav__close-menu');
const body = document.body;

let photos = [
    'images/desktop-image-hero-1.jpg',
    'images/desktop-image-hero-2.jpg',
    'images/desktop-image-hero-3.jpg',
];
let currentIdx = 0;

controls.forEach(control => {
    control.addEventListener('click', changePanel)
})
window.addEventListener('keyup', changePanel);

toggle.addEventListener('click', changeTheme);

openMenu.addEventListener('click', toggleMenu)
closeMenu.addEventListener('click', toggleMenu)

function toggleMenu() {
    body.classList.toggle('show-mobile');
}

function changePanel(e) {
    if (e.target.id === 'back' || e.target.parentNode.id === 'back' || e.keyCode === 37) {
        console.log(currentIdx);
        if (currentIdx - 1 < 0) {
            currentIdx = photos.length - 1;
        } else {
            --currentIdx;
        }

    } else if (e.target.id === 'forward' || e.target.parentNode.id === 'forward' || e.keyCode === 39) {
        console.log(currentIdx);
        if (currentIdx + 1 >= photos.length) {
            currentIdx = 0;
        } else {
            ++currentIdx;
        }
    }

    body.classList.remove('hero-1', 'hero-2', 'hero-3');
    body.classList.add(`hero-${currentIdx + 1}`);
    heroPanels.forEach(panel => !panel.classList.contains('show') || panel.classList.remove('show'));
    heroPanels[currentIdx].classList.add('show');
}

function changeTheme() {
    if (body.classList.contains('dark')) {
        body.classList.remove('dark');
        toggle.innerHTML = `<box-icon name='sun' class="icon" id="sun"></box-icon>`
    } else {
        body.classList.add('dark');
        toggle.innerHTML = `<box-icon name='moon' class="icon" id="moon"></box-icon>`
    }
}

window.addEventListener('resize', () => {
    if (window.innerWidth > 650) {
        body.classList.remove('show-mobile');
    }
})