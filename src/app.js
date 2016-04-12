import React, { Component } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Game } from './components/game'

// need to define the app component within containers
// import App from './containers/App';
// import configureStore from './store/configureStore';
// import sass from source`

// const store = configureStore();


// app needs to have state newGame and then board component will reinitialize with a default board state
class App extends Component {
	render() {
		return (
			<div>
				<h1>Mine Sweeper</h1>
				<Game isNew="true"></Game>
			</div>

		)
	}
}

render(<App/>, document.getElementById('root'))
