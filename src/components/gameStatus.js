import React from 'react'
import classNames from 'classNames'

export class GameStatus extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			show: false
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.gameOver || nextProps.didWin) {
			this.setState({
				show: true
			})
		}
	}

	handleClick() {
		this.setState({
			show: false
		})

		this.props.startGame()
	}

	render() {
		if (this.state.show) {

			let gameStatus = ''

			if (this.props.gameOver) {
				gameStatus = <h2 className='game-over'>GAME OVER</h2>
			} else if (this.props.didWin) {
				gameStatus = <h2 className='game-won'>YOU WON!</h2>
			}

			let template =	(
				<div className="game-status-container">
					<div className="game-status-content">
						{gameStatus}
						<button className="btn" onClick={this.handleClick.bind(this)}>New Game</button>
					</div>
					
				</div>
			)

			return template
		} else {
			return null
		}
	}
}