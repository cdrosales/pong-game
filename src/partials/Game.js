import {SVG_NS, KEYS} from '../settings' //dont need settings
import Board from './Board'
import Paddle from './Paddle'
import Ball from './Ball'
import Score from './Score'

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

    this.board = new Board(this.width, this.height) // this is from game in index.js
    this.ball = new Ball(8, this.width, this.height)

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

    this.score1 = new Score(this.width /2 - 50, 30, 30) // score positioning 
    this.score2 = new Score(this.width /2 + 50, 30, 30)
        

      // event listener to pause game 
      document.addEventListener('keydown', event => {
        switch(event.key) {
        case KEYS.spaceBar:
          this.pause = !this.pause
          this.player1.speed = 10
          this.player2.speed = 10
          console.log(this.pause)
        }  
      }) 
    
  }

  render() { 

    if (this.pause) {
      this.player1.speed = 0
      this.player2.speed = 0
      return
    }

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
   this.ball.render(svg, this.player1, this.player2)


   this.score1.render(svg, this.player1.score)
   this.score2.render(svg, this.player2.score)

  }
}
