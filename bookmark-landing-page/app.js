const form = document.querySelector('.form');
const emailInput = document.querySelector('.form__email');
const questions = document.querySelectorAll('.question');
const stateEl = document.querySelector('.form__state');


questions.forEach(question => {
    question.addEventListener('click', () => {
        question.classList.toggle('opened');
    })
});

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


