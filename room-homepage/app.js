const controls = document.querySelectorAll('.control');
const heroImg = document.querySelector('.hero__photo img');
const heroContent = document.querySelectorAll('.hero__content > div');

let photos = [
    'images/desktop-image-hero-1.jpg',
    'images/desktop-image-hero-2.jpg',
    'images/desktop-image-hero-3.jpg',
];
let currentIdx = 0;

controls.forEach(control => {
    control.addEventListener('click', changePicture)
})
window.addEventListener('keyup', changePicture);

function changePicture(e) {
    console.log(e);
    if (e.target.id === 'back' || e.keyCode === 37) {
        if (currentIdx - 1 < 0) {
            currentIdx = photos.length - 1;
        } else {
            --currentIdx;
        }

    } else if (e.target.id === 'forward' || e.keyCode === 39) {
        if (currentIdx + 1 >= photos.length) {
            currentIdx = 0;
        } else {
            ++currentIdx;
        }
    }

    heroImg.src = photos[currentIdx];
    document.body.className = '';
    document.body.classList.add(`hero-${currentIdx + 1}`);
}