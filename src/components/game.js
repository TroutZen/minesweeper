import React from 'react'
import {Board, Tile} from '../utils/Board'
import {gameStates} from '../constants/gameStates'

export class Game extends React.Component {

	constructor(props) {
		super(props)

		this._timerId
		// graph of interconnected cells
		this._board = null;

		this.state = {
			size: props.size,
			flagsLeft: props.size,
			timer: 0,
			state: gameStates.newGame,
			index: this._board.getIndex()
		}
	}

	incrementTimer() {
		this._timerId = setInterval(() => {
			this.setState({
				timer: ++this.state.timer
			})
		}
		, 1000)
	}

	checkTile(location) {
		let board = this._board
		let node = board[index]
		
		if (node.isMine()) {
			this.props.triggerGameOver()
		} else {
			node.check()	
		}

		this.setState({
			index: board.getIndex()
		})
	}

	resetTimer() {
		clearInterval(this._timerId)
		this.setState({
			timer: 0
		})
	}

	buildTableRow(size) {
		let tableCells = [];
		for (let i = 0; i < size; i++) {
			// tableCells.push(<Cell className="ms-cell" key={i}></Cell>)
			tableCells.push(<td className="ms-cell" key={i}></td>)
		}

		return (
			<tr>
				{tableCells}
			</tr>
		)
	}

	buildTableRows(size) {
		return new Array(size).fill(null).map(()=>{
			return this.buildTableRow(size)
		})
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.newGame) {
			this.incrementTimer()
			// initialize board when user selects new game
			this._board = new Board(props.size).initBoard()
		} else {
			this.resetTimer()
		}
	}

	render() {
		return (
			<div className="game-container">
				<div>
					<div>{this.state.flagsLeft}</div>
					<div>{this.state.timer}</div>
				</div>	
				<table>
					<tbody>
						{this.buildTableRows(this.state.size)}
					</tbody>
				</table>		
			</div>	
		)
	}
}