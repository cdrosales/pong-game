import {SVG_NS} from '../settings'

export default class Ball {
    constructor(radius, boardWidth, boardHeight) {
    this.radius = radius
    this.boardWidth = boardWidth
    this.boardHeight = boardHeight
    this.direction = 1 // direction of the ball
    
    this.reset()
    }

    reset() {
        this.x = this.boardWidth/2
        this.y = this.boardHeight/2

        this.vy = 0 
        while(this.vy === 0){ // whenver vy =0
            this.vy = Math.floor(Math.random() * 10 -5)// generate a random numbber -5 5 //math.floor wont return negatives // math random pics a num ber between 0 and 1        
        }
        this.vx = this.direction * (6 - Math.abs(this.vy)) // be abble to go up or down  
    
        console.log(this.vy)
        console.log(this.vx)
    }


    paddleCollision(player1, player2){
        if (this.vx > 0){
            let paddle = player2.coordinates(player2.x, player2.y, player2.width, player2.height)
            let [leftX, rightX, topY, bottomY] = paddle //destructuring array
            if (
                (this.x + this.radius >= leftX)
                && (this.x + this.radius <= rightX)
                && (this.y >= topY && this.y <= bottomY)
            ) {
                this.vx = -this.vx;
            }
        } else {
                let paddle = player1.coordinates(player1.x, player1.y, player1.width, player1.height)
                let [leftX, rightX, topY, bottomY] = paddle //destructuring array
             if (
                (this.x - this.radius >= leftX)
                && (this.x - this.radius <= rightX)
                && (this.y >= topY && this.y <= bottomY)
            ) {
                this.vx = -this.vx;
            }
        } 
    }

    wallCollision(){
        const hitTop = this.y - this.radius <= 0 // so the ball hits the collision  and doesnt hit the center of the ball
        const hitBottom = this.y + this.radius >= this.boardHeight

        if(hitTop || hitBottom) {
        this.vy = -this.vy    
    }

        const hitRight = this.x - this.radius <= 0
        const hitLeft = this.x + this.radius >= this.boardWidth

        if(hitRight || hitLeft) {
            this.vx = -this.vx
        }
    }


    render(svg, player1, player2) {
        this.x += this.vx 
        this.y += this.vy 
    
        this.wallCollision();
        this.paddleCollision(player1, player2)


        let circle = document.createElementNS(SVG_NS, 'circle')
        circle.setAttributeNS(null, 'r', this.radius);
        circle.setAttributeNS(null, 'cx', this.x);    
        circle.setAttributeNS(null, 'cy',  this.y);
        circle.setAttributeNS(null, 'fill', 'white');
        svg.appendChild(circle)
    }
}