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
			board: null,
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

	createGame() {
		let indices = createIndices()
		let mineLocations = chooseBombIndices()
		mineLocations.forEach((location)=>{
			indices[location] = new Tile('mine')
		})

		for (let [location, node] of indices) {
			if (!node) {
				indices[location] = new Tile('blank')
			}
		}
	}

	createBoard() {
		
	}

	createIndices(size) {
		let indices = {}
		let row, col = 0

		for (; i < size; i++) {
			for (; j < size; j++) {
				indices['' + i + j] = void 0
			}
		}

		return indices
	}

	chooseMineIndices(size) {
		let count = 0
		let indices = {}
		let indicesArray = []
		while (count < size) {
			chooseIndex()
			count++
		}

		function chooseIndex() {
			let row = Math.floor(Math.random(size))
			let col = Math.floor(Math.random(size))
			if (!indices['' + row + col]) {
				indicesArray.push('' + row + col)
			} else {
				chooseIndex()
			}
		}

		return indicesArray
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