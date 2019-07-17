import {SVG_NS} from '../settings' //dont need settings

export default class Game {
  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;

		this.gameElement = document.getElementById(this.element) // caling div id = "game" from HTML
  }

  render() { 

    // clear board 
    this.gameElement.innerHTML = '' // so canvas doesnt stack on top of each other because of the infinite loop
   // create SVG element for the board

   let svg = document.createElementNS(SVG_NS, 'svg')
   svg.setAttributeNS(null, 'width', this.width) // accepts one more parameter than the reg div.setAttribute
   svg.setAttributeNS(null, 'height', this.height) //this is referring to index.js
   svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`) // 0-width 0-height || `` let you add variables without +  
   this.gameElement.appendChild(svg) //appends to html

  }
}
