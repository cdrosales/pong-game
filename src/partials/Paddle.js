import {SVG_NS} from '../settings'

export default class Paddle {
    constructor(boardHeight,width, height, x, y) {
    this.boardHeight = boardHeight
    this.width = width
    this.height = height
    this.x = x
    this.y = y
    this.speed = 10
    this.score = 0
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