import {SVG_NS} from '../settings'

export default class Paddle {
    constructor(boardHeight,width, height, x, y, up, down) { //coordinates with game.js
        this.boardHeight = boardHeight
        this.width = width
        this.height = height
        this.x = x
        this.y = y
        this.speed = 10
        this.score = 0
        // let this = this // binding this a variable (this)

        document.addEventListener('keydown', event=>  { // function(eventTHIS was referring to the keydown function
            switch(event.key) {
                case up: // when its up which is defined in settings js 
                    this.y = Math.max(0,this.y - this.speed) //movement for the paddles -- Math Max puts the limit.
                break // exit switch statement
                case down:
                    this.y = Math.min(this.boardHeight - this.height,this.y + this.speed) //movement for paddle to go down // it will pick one of the two for the limit
                break
            }
        })
    }

    coordinates(x, y, width, height){ 
        let leftX = x
        let rightX = x + width
        let topY = y
        let bottomY = y + height
        return[leftX, rightX, topY, bottomY]

    }


    render(svg) {
        let rect = document.createElementNS(SVG_NS, 'rect')
        rect.setAttributeNS(null,'fill', 'white')  // set Attribute for SVGs specifically
        rect.setAttributeNS(null, 'width', this.width)
        rect.setAttributeNS(null, 'height', this.height)
        rect.setAttributeNS(null,'x', this.x) // x of the top left corner
        rect.setAttributeNS(null,'y', this.y) // y of the top left corner
        svg.appendChild(rect);

    }



}