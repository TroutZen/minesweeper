import React from 'react'
import {Board, Tile} from '../utils/Board'

export class Game extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			size: 10,
			minesLeft: 10,
			timer: 0,
			// graph of interconnected cells
			board: new Board(),
			// map of rowcol ('00' for 0th row, 0th col) to nodes
			index: {}
		}

		this._timerId;
	}

	incrementTimer() {
		this._timerId = setInterval(() => {
			this.setState({
				timer: ++this.state.timer
			})
		}
		, 1000)
	}

	// updateBoardState({}){
	// 	this.setState(Object.assign({}, this.state.board, newState))
	// }

	createBoard() {
		
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
		if(nextProps.isNew) {
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