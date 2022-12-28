const tabContent = document.querySelectorAll('.tabcontent')
const tabButton = document.querySelectorAll('.tabheader__item')
const tabParent = document.querySelector('.tabheader__items')

const hideContent = () => {
    tabContent.forEach(tabContent => tabContent.classList.remove('tabcontent_active'))
    tabButton.forEach(tabBtn => tabBtn.classList.remove('tabheader__item_active'))
}

const showContent = (i = 0) => {
    tabContent[i].classList.add('tabcontent_active')
    tabButton[i].classList.add('tabheader__item_active')
}

hideContent()
showContent()

tabParent.addEventListener('click', (event) => {
    const target = event.target
    if (!target.classList.contains('tabheader__item_active')) {
        tabButton.forEach((button, idx) => {
            if (button === target) {
                hideContent()
                showContent(idx)
            }
        })
    }
})

const modal = document.querySelector('.modal')
const Close = document.querySelector('.modal__close')
const Open = document.getElementById('modal-btn')

Open.addEventListener('click', () => modal.classList.add('modal_open'))
Close.addEventListener('click', () => modal.classList.remove('modal_open'))

const forms = document.querySelectorAll('form')

const messageText = {
    loading: 'Загрузка...',
    success: 'Все успешно сохранено!',
    error: 'Что то пошло не так...',
}

const postData = form => {
    form.addEventListener('submit', e => {
        e.preventDefault()

        const messageBlock = document.createElement('div')
        messageBlock.textContent = messageText.loading
        form.append(messageBlock)
        const request = new XMLHttpRequest()
        request.open('POST', './php/server.php')
        
        const formData = new FormData(form)
        messageBlock.classList.add('message')
        messageBlock.classList.add('loading')
        
        request.send(formData)
        request.addEventListener('load', () => {
            messageBlock.classList.remove('loading')
            if (request.status === 200) {
                const response = request.response
                console.log(response, 'response from server')
                messageBlock.classList.add('success')
                messageBlock.textContent = messageText.success
            } else {
                messageBlock.classList.add('request error')
                messageBlock.textContent = messageText.error;
            }
            setInterval(() => {
                messageBlock.remove()
            }, 5000)
        })
    })
}

forms.forEach(form => {
    formData(form)
})