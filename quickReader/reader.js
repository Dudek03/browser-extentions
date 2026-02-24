const MAIN = document.getElementById('wordDiv')
document.addEventListener('keydown', (e) => {
    if(e.key == ' '){
        pause = !pause
    }else if(e.key == 'd'){
        MAIN.innerText = 'coś działa'
    }
})

const params = new URLSearchParams(window.location.search);
const text = decodeURIComponent(params.get('text') || '');let textToRead = text.split(' ')
MAIN.innerText = textToRead
let delay = 200
let wordIndex = 0
let pause = true

let reading = setInterval(() => {
    if(pause) return
    MAIN.innerText = textToRead[wordIndex]
    wordIndex++
}, delay)
