import React, { Component } from 'react'
import { render } from 'react-dom'
import { Game } from './components/game'
import {gameStates} from './constants/gameStates'

// need to define the app component within containers
// import App from './containers/App';
// import sass from source

// app needs to have state newGame and then board component will reinitialize with a default board state
class App extends Component {

	constructor(props){
		super(props)
		this.state = {
			newGame: false,
			gameOver: false
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
			gameOver: true,
		})
	}

	// used by game component to change app state
	triggerGameOver(){
		alert('Game Ova!')
		this.endGame()
	}

	render() {
		let button;
		if (!this.state.newGame) {
			button = <div className="btn-start-game" onClick={this.startGame.bind(this)}>Start Game</div>
		} else {
			button = <div className="btn-new-game" onClick={this.resetGame.bind(this)}>New Game</div>
		}

		return (
			<div>
				<h1>Mine Sweeper</h1>
				{button}		
				<Game newGame={this.state.newGame} size={this.state.size || 10} triggerGameOver={this.triggerGameOver.bind(this)}></Game>
			</div>

		)
	}
}

render(<App/>, document.getElementById('root'))
