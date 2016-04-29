// TODO: export all components from index.js and import from there
import React, { Component } from 'react'
import { render } from 'react-dom'
import { Game } from './components/game'
import { GameStatus } from './components/gameStatus'
import { Board, Tile } from './utils/Board'
import { gameStates } from './constants/gameStates'
import classNames from 'classnames'

require('./stylesheets/main.scss')
require('../node_modules/font-awesome/scss/font-awesome.scss')

class App extends Component {

	constructor(props){
		super(props)
		this.state = {
			newGame: false,
			gameOver: false,
			board: Board,
			didWin: false
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

	renderGameStatus(){
		let gameStatus = ''

		if (this.state.gameOver) {
			gameStatus = <h2>Game Over!</h2>
		} else if (this.state.didWin) {
			gameStatus = <h2>You Won!</h2>
		}

		return gameStatus
	}

	renderButton(){
		let btnClass = classNames({
			'hidden': this.props.gameOver || this.props.didWin,
			'btn': true,
			'new-game': true
		})

		return <button className={btnClass} onClick={this.startGame.bind(this)}>New Game</button>
	}

	render() {
		let btn = this.renderButton()

		return (
			<div>
				<div className="header">
					<div className="title">
						<h1>Mine Sweeper</h1>
					</div>
					<GameStatus didWin={this.state.didWin} gameOver={this.state.gameOver} startGame={this.startGame.bind(this)}></GameStatus>
					<div>
						{btn}
					</div>
				</div>			
				<Game newGame={this.state.newGame} size={this.state.size || 10} triggerGameOver={this.triggerGameOver.bind(this)} board={this.state.board} triggerWin={this.triggerWin.bind(this)}></Game>
			</div>

		)
	}
}

render(<App/>, document.getElementById('root'))
