const canvas = document.getElementsByTagName('canvas')[0]
canvas.height = window.innerHeight
canvas.width = window.innerWidth

window.addEventListener('resize', e => {
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth
})

class Arrow{
    constructor() {
        this.x = 0
        this.y = 0
        this.angle = 0
    }
    draw(context) {
        context.save()
        context.translate(this.x, this.y)
        context.rotate(this.angle)
        context.beginPath()
        context.moveTo(0,0)
        context.lineTo(-40,15)
        context.lineTo(-40,-15)
        context.closePath()
        context.fillStyle = 'orange'
        context.fill()
        context.restore()
    }
}

const arrow = new Arrow()

const initPos = {
    x: canvas.width /2 ,
    y: canvas.height / 2
}

arrow.x = initPos.x
arrow.y = initPos.y

let context = canvas.getContext('2d')
let mouse = captureMouse(initPos)
let v = 10
;(function drawFrame(){
    window.requestAnimationFrame(drawFrame)
	context.clearRect(0, 0, canvas.width, canvas.height)
	let dx = mouse.x - arrow.x
	let dy = mouse.y - arrow.y
	let angle = Math.atan2(dy, dx)

    let vx
	let vy
	if (dx * dx + dy * dy < v * v) {
		vx = 0
		vy = 0
	} else {
		vx = Math.cos(angle) * v
		vy = Math.sin(angle) * v
	}
	
	arrow.x += vx
	arrow.y += vy
    console.log(vx, vy)


	arrow.angle = angle
    arrow.draw(context)
})()

function captureMouse (mouse = {x:0, y:0}) {
    canvas.addEventListener('mousemove', event => {
        mouse.x = event.pageX - canvas.offsetLeft
        mouse.y = event.pageY - canvas.offsetTop        
    })
    return mouse
}