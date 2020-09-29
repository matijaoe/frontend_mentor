const controls = document.querySelectorAll('.control');
const heroImg = document.querySelector('.hero__photo img');
const heroPanels = document.querySelectorAll('.hero__panel');
const toggle = document.querySelector('#theme-toggle');

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

toggle.addEventListener('click', changeTheme)

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

    document.body.classList.remove('hero-1', 'hero-2', 'hero-3');
    document.body.classList.add(`hero-${currentIdx + 1}`);
    heroPanels.forEach(panel => !panel.classList.contains('show') || panel.classList.remove('show'));
    heroPanels[currentIdx].classList.add('show');
}

function changeTheme() {
    if (document.body.classList.contains('dark')) {
        document.body.classList.remove('dark');
        toggle.innerHTML = `<box-icon type='solid' name='sun' class="icon" id="sun"></box-icon>`
    } else {
        document.body.classList.add('dark');
        toggle.innerHTML = `<box-icon type='solid' name='moon' class="icon" id="moon"></box-icon>`
    }
}