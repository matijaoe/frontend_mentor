// features
const features = [...document.querySelectorAll('.feature')];
const featureTab = [...document.querySelectorAll('.features__tab')];
// faq
const questions = document.querySelectorAll('.question');
// Email validation
const form = document.querySelector('.form');
const emailInput = document.querySelector('.form__email');
const stateEl = document.querySelector('.form__state');

const nav = document.querySelector('.nav');
const navLink = document.querySelectorAll('.nav__link');
const mobileIcon = document.querySelector('.nav__mobile-icon');
const mobileMenu = document.querySelector('.mobile-nav');


questions.forEach(question => {
    question.addEventListener('click', () => {
        question.classList.toggle('opened');
    })
});

featureTab.forEach(featureLabel => {
    featureLabel.addEventListener('click', () => {
        // remove other active classes
        performClassSwitcheroo(featureTab, featureLabel, 'active');
        let featureId = featureLabel.dataset.feature;
        let featureElement = document.getElementById(featureId);
        performClassSwitcheroo(features, featureElement, 'show');
    })
})

mobileIcon.addEventListener('click', () => {
    mobileIcon.classList.toggle('open');
    mobileMenu.classList.toggle('hidden');
    nav.classList.toggle('hidden');
})

document.querySelector('.mobile-nav__exit').addEventListener('click', () => {
    mobileIcon.classList.toggle('open');
    mobileMenu.classList.toggle('hidden');
    nav.classList.toggle('hidden');
});

navLink.forEach(link => {
    link.addEventListener('click', () => {
        mobileIcon.classList.remove('open');
        mobileMenu.classList.add('hidden');
        nav.classList.remove('hidden');
    })
});

function performClassSwitcheroo(elements, target, className) {
    elements.filter(elem => elem.classList.contains(className)).forEach(elem => elem.classList.remove(className));
    target.classList.add(className);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let email = emailInput.value;
    if (!validateEmail(email)) {
        showEmailError();
    } else {
        showEmailSuccess()
    }
});

function validateEmail(email) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
    return emailRegex.test(email);
}

function showEmailError() {
    resetEmailForm()
    showErrorMsg();
    emailInput.focus();

    // on input change, hide msg but leave the red border and error icon
    emailInput.addEventListener('input', hideValidationMsg);
}

function showEmailSuccess() {
    resetEmailForm();
    showSuccessMsg();
    emailInput.value = '';
    emailInput.blur();

    emailInput.addEventListener('input', hideValidationMsg);
}

function showErrorMsg() {
    stateEl.classList.add('error');
    showValidationMsg();
    stateEl.innerText = `Whoops, make sure it's an email`;
}

function showSuccessMsg() {
    stateEl.classList.add('success');
    showValidationMsg();
    stateEl.innerText = `Email submitted`;
}

function showValidationMsg() {
    stateEl.classList.add('show');
}

function hideValidationMsg() {
    stateEl.classList.remove('show');
}

function resetEmailForm() {
    hideValidationMsg();
    stateEl.classList.remove('success');
    stateEl.classList.remove('error');
}


