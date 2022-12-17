const box = document.querySelector('.box')
const wrap = document.querySelector('.wrap')
const go = document.getElementById('go')
const finish = document.getElementById('finish')

let posX = 0
let posY = 0
let boxSize = 50
let wrapW = 530
let wrapH = 300

box.style.width = `${boxSize}px`
box.style.height = `${boxSize}px`
wrap.style.width = `${wrapW}px`
wrap.style.height = `${wrapH}px`

function move() {
        if (posY >= 0 && posY < wrapH - boxSize && posX === wrapW - boxSize) {
            posY++
        } else if (posX > 0 && posX <= wrapW - boxSize && posY === wrapH - boxSize) {
            posX--
        } else if (posY > 0 && posY <= wrapH - boxSize && posX === 0) {
            posY--
        } else if (posX >= 0 && posY === 0) {
            posX++
        }
    box.style.left = `${posX}px`
    box.style.top = `${posY}px`
}

let moveInterval

go.addEventListener('click', () => {
    moveInterval = setInterval(move, 1)
})

finish.addEventListener('click', () => {
    clearInterval(moveInterval)
})

const hrs= document.getElementById('hours')
const min = document.getElementById('minutes')
const sec = document.getElementById('seconds')
const startButton = document.getElementById('start')
const pauseButton = document.getElementById('stop')

let second = 00
let minute = 00
let hour = 00
let interval

startButton.addEventListener('click' , () => {
    clearInterval(interval)
    interval = setInterval(startTimer, 10)
})
pauseButton.addEventListener('click' , () => {
    clearInterval(interval)
})
function startTimer () {
    seconds++
    if(seconds < 9) {
        sec.innerText = '0' + second
    }
    if(second > 9) {
        sec.innerText = second
    }
    if(second > 59) {
        minute++
        min.innerText = '0' + minute
        second = 0
        sec.innerText = '0' + second
    }
    if(minute < 9) {
        min.innerText = '0' + minute
    }
    if(minute > 9) {
        min.innerText = minute
    }
    if(minute > 59) {
        hour++
        hrs.innerText = '0' + hour
        minute = 0
        min.innerText = '0' + minute
    }
    if(hour < 9) {
        hrs.innerText = '0' + hour
    }
    if(hour > 9) {
        hrs.innerText = hour
    }
   
}