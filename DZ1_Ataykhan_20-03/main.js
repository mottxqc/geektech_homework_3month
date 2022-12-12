const form = document.querySelector('form')
const digitsInput = document.getElementById('digits')
const innInput = document.getElementById('inn')
const innError = document.getElementById('inn-error')
const birthdayInput = document.getElementById('birthday')

const digitsRegExp = /^\+7\(6\d{2}\)\d{3}-\d{2}-\d{2}$/
const innRegExpFirstNumber= /^(1|2)/
const innRegExp = /^(1|2)\d{13}$/
const birthdayRegExp = /^(0[1-9]|[1-2]\d|3(0|1))-(0[1-9]|1[0-2])-(19\d\d|20([0-1]\d|2[0-2]))$/

form.addEventListener('submit', e => {
    e.preventDefault()

    const digitsValue = digitsInput.value
    const innValue = innInput.value
    const birthdayValue = birthdayInput.value

    if (digitsRegExp.test(digitsValue)) {
        digitsInput.classList.remove('error')
    } else {
        digitsInput.classList.add('error')
    }

    if (innRegExpFirstNumber.test(innValue)) {
        if (innRegExp.test(innValue)) {
            innInput.classList.remove('error')
        } else {
            innError.textContent = 'Не корректный ИНН'
            innInput.classList.add('error')
        }
    } else {
        innError.textContent = 'Первая цифра должна быть 1 или 2'
        innInput.classList.add('error')
    }

    if (birthdayRegExp.test(birthdayValue)) {
        birthdayInput.classList.remove('error')
    } else {
        birthdayInput.classList.add('error')
    }
})