import React from 'react'
import classNames from 'classNames'

export class GameStatus extends React.Component {
	constructor(props) {
		super(props)
	}

	renderGameStatus(){	
		let gameStatus = ''

		if (this.props.gameOver) {
			gameStatus = <h2 className='game-over'>GAME OVER</h2>
		} else if (this.props.didWin) {
			gameStatus = <h2 className='game-won'>YOU WON!</h2>
		}

		return gameStatus
	}

	render() {
		let gameStatus = this.renderGameStatus()
		let statusCtnClass = classNames({
			'hidden': !this.props.gameOver && !this.props.didWin,
			'game-status-container' : true
		})

		return (
			<div className={statusCtnClass}>
				<div className="game-status-content">
					{gameStatus}
					<button className="btn" onClick={this.props.startGame}>New Game</button>
				</div>	
			</div>
		)
	}
}