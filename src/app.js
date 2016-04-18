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
			gameOver: false,
			didWin: false
		}) 
	}

	endGame() {
		this.setState({
			newGame: false,
			gameOver: true,
			didWin: false
		})
	}

	winGame() {
		this.setState({
			newGame: false,
			gameOver: false,
			didWin: true
		})
	}

	triggerWin(){
		this.winGame()
	}

	triggerGameOver(){
		this.endGame()
	}

	render() {
		let button = <div className="btn-new-game" onClick={this.startGame.bind(this)}>New Game</div>
		let gameStatus = ''

		if (this.state.gameOver) {
			gameStatus = <h2>Game Over!</h2>
		} else if (this.state.didWin) {
			gameStatus = <h2>You Won!</h2>
		}

		return (
			<div>
				<h1>Mine Sweeper</h1>
				{gameStatus}
				{button}		
				<Game newGame={this.state.newGame} size={this.state.size || 10} triggerGameOver={this.triggerGameOver.bind(this)} board={this.state.board} triggerWin={this.triggerWin.bind(this)}></Game>
			</div>

		)
	}
}

render(<App/>, document.getElementById('root'))
