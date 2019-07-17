import {SVG_NS, KEYS} from '../settings' //dont need settings
import Board from './Board';
import Paddle from './Paddle';

export default class Game {
  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;


		this.gameElement = document.getElementById(this.element) // caling div id = "game" from HTML
  
    // paddle dimensions
    this.paddleWidth = 8
    this.paddleHeight = 56
    this.boardGap = 10

    //Player 1 Paddle
    this.player1 = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.boardGap,
      ((this.height - this.paddleHeight) / 2), //center perfectly in the middle
      KEYS.a,
      KEYS.z
    )

    //Player 2 Paddle
    this.player2 = new Paddle(
      this.height,
      this.paddleWidth, // order makes a difference - must be same order as constructor
      this.paddleHeight,
      (this.width - this.boardGap - this.paddleWidth),// board width - board gap - paddle width to put on the other end
      ((this.height - this.paddleHeight) / 2), //center perfectly in the middle
      KEYS.up,
      KEYS.down
    )


    this.board = new Board(this.width, this.height) // this is from game in index.js
  
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

   this.board.render(svg)
   this.player1.render(svg)
   this.player2.render(svg)
  }
}
