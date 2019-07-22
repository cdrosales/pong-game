import {SVG_NS, KEYS} from '../settings'
import Board from './Board'
import Paddle from './Paddle'
import Ball from './Ball'
import Score from './Score'

export default class Game {
  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;


	this.gameElement = document.getElementById(this.element) 
  

    this.paddleWidth = 8
    this.paddleHeight = 56
    this.boardGap = 10

    this.board = new Board(this.width, this.height)
    this.ball1 = new Ball(8, this.width, this.height)
    this.ball2 = new Ball(10, this.width, this.height)
    this.ball3 = new Ball(10, this.width, this.height)

    this.player1 = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.boardGap,
      ((this.height - this.paddleHeight) / 2),
      KEYS.a,
      KEYS.z
    )

    this.player2 = new Paddle(
      this.height,
      this.paddleWidth, 
      this.paddleHeight,
      (this.width - this.boardGap - this.paddleWidth),
      ((this.height - this.paddleHeight) / 2), 
      KEYS.up,
      KEYS.down
    )

    this.score1 = new Score(this.width /2 - 80, 50, 40)
    this.score2 = new Score(this.width /2 + 30, 50, 40)


      document.addEventListener('keydown', event => {
        switch(event.key) {
        case KEYS.spaceBar:
          this.pause = !this.pause
          this.player1.speed = 20
          this.player2.speed = 20
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
    if (this.player1.score === 2 || this.player2.score === 2){
     
    }

   this.gameElement.innerHTML = '' 


   let svg = document.createElementNS(SVG_NS, 'svg')
   svg.setAttributeNS(null, 'width', this.width) 
   svg.setAttributeNS(null, 'height', this.height)
   svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`) 
   
   this.gameElement.appendChild(svg) 

   this.board.render(svg)
   this.player1.render(svg)
   this.player2.render(svg)
   this.ball1.render(svg, this.player1, this.player2)
   this.ball2.render(svg, this.player1, this.player2) 
   this.ball3.render(svg, this.player1, this.player2) 

   this.score1.render(svg, this.player1.score)
   this.score2.render(svg, this.player2.score)

  }
}
