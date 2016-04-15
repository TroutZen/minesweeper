import React, { Component } from 'react'
import { render } from 'react-dom'
import { Game } from './components/game'
import { Board, Tile } from './utils/Board'
import { gameStates } from './constants/gameStates'
require('./stylesheets/main.scss')

class App extends Component {

	constructor(props){
		super(props)
		this.state = {
			newGame: false,
			gameOver: false,
			board: Board
		}
	}

	startGame() {
		this.setState({
			newGame: true,
			gameOver: false
		}) 
	}

	resetGame() {
		this.setState({
			newGame: false,
			gameOver: false
		})
	}

	endGame() {
		this.setState({
			newGame: false,
			gameOver: true
		})
	}

	triggerWin(){
		alert('You Win!');
	}

	triggerGameOver(){
		alert('Game Ova!')
	}

	render() {
		// if gameOver is true,
		// show modal with game over
		// onclick game over resetGame()

		let button = <div className="btn-new-game" onClick={this.resetGame.bind(this)}>New Game</div>

		return (
			<div>
				<h1>Mine Sweeper</h1>
				{button}		
				<Game newGame={this.state.newGame} size={this.state.size || 10} triggerGameOver={this.triggerGameOver.bind(this)} board={this.state.board} triggerWin={this.triggerWin.bind(this)}></Game>
			</div>

		)
	}
}

render(<App/>, document.getElementById('root'))
