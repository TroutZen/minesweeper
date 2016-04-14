import React from 'react'
import {Board, Tile} from '../utils/Board'
import {gameStates} from '../constants/gameStates'

export class Game extends React.Component {

	constructor(props) {
		super(props)

		this._timerId
		// graph of interconnected cells
		this._board = new Board(props.size).initBoard()

		this.state = {
			size: props.size,
			minesLeft: props.size,
			timer: 0,
			state: gameStates.newGame,
			tiles: this._board.getTiles()
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

	clickHandler(event, location) {
		let board = this._board
		let node = board[index]
		node.check()
		this.setState({
			tiles: board.getTiles()	
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
		} else {
			this.resetTimer()
		}
	}

	componentDidMount() {
		
	}

	render() {
		return (
			<div className="game-container">
				<div>
					<div>{this.state.minesLeft}</div>
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