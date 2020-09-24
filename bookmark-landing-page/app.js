const form = document.querySelector('.form');
const emailInput = document.querySelector('.form__email');
const questions = document.querySelectorAll('.question');



questions.forEach(question => {
    question.addEventListener('click', () => {
        question.classList.toggle('opened');
    })
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let email = emailInput.value;
    if (!validateEmail(email)) {
        showEmailError(email);
    } else {
        showEmailSuccess()
    }

});

function validateEmail(email) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
    return emailRegex.test(email);
}

function showEmailError(email) {
    console.log('wrong email: ', email);
    document.querySelector('.form__state.error').classList.add('show');
    document.querySelector('.form__state.success').classList.remove('show');
    emailInput.classList.add('wrong');
    emailInput.classList.remove('correct');
    emailInput.focus();

    emailInput.addEventListener('input', () => {
        document.querySelector('.form__state.error').classList.remove('show');
    });

}

function showEmailSuccess() {
    document.querySelector('.form__state.error').classList.remove('show');
    document.querySelector('.form__state.success').classList.add('show');
    emailInput.classList.remove('wrong');
    emailInput.classList.add('correct');
    emailInput.value = '';
    emailInput.blur()

    emailInput.addEventListener('focus', resetEmailForm);
}

function resetEmailForm() {
    emailInput.classList.remove('correct');
    document.querySelector('.form__state.success').classList.remove('show');
}