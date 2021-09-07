

const a = document.createElement('a')
a.setAttribute('href', '/index/index.html')
a.text = 'go to index'
const h1 = document.createElement('h1')
h1.innerText = 'this is about page'
document.body.appendChild(a)
document.body.appendChild(h1)

$('body').append('12345')

const p = new Promise((a, b) => {
    return a + b
}).then((val) => {
    console.log('value is: ', val)
})
