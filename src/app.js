import React, { Component } from 'react'
import { render } from 'react-dom'
// import { Provider } from 'react-redux'
import { Game } from './components/game'

// need to define the app component within containers
// import App from './containers/App';
// import sass from source

// app needs to have state newGame and then board component will reinitialize with a default board state
class App extends Component {

	constructor(props){
		super(props)
		this.state = {
			isNew: false
		}
	}

	startGame() {
		this.setState({
			isNew: true
		}) 
	}

	resetGame() {
		this.setState({
			isNew: false
		})
	}

	render() {
		let button;
		if (!this.state.isNew) {
			button = <div className="btn-start-game" onClick={this.startGame.bind(this)}>Start Game</div>
		} else {
			button = <div className="btn-new-game" onClick={this.resetGame.bind(this)}>New Game</div>
		}

		return (
			<div>
				<h1>Mine Sweeper</h1>
				{button}		
				<Game isNew={this.state.isNew}></Game>
			</div>

		)
	}
}

render(<App/>, document.getElementById('root'))
