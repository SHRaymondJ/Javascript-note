
const a = document.createElement('a')
a.setAttribute('href', '/about/about.html')
a.text = 'go to about'
const h1 = document.createElement('h1')
h1.innerText = 'this is index'
document.body.appendChild(a)
document.body.appendChild(h1)

const x = new Array(365).fill(1+1/55).reduce((r, c)=>{
    return r * c
}, 5000)

alert(x)