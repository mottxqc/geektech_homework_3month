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