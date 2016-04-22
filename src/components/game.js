import React from 'react'
import {Board, Tile} from '../utils/Board'
import {gameStates} from '../constants/gameStates'
import {BoardTile} from './boardTile'

export class Game extends React.Component {

	constructor(props) {
		super(props)
		let Board = props.board
		
		this._timerId
		this._board = new Board(props.size).initBoard() // graph of interconnected cells

		this.state = {
			size: props.size,
			flagsLeft: props.size,
			index: this._board.getIndex(),
			checksRemaining: props.size * props.size,
			disableBoard: false
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

	disableBoard() {
		this.setState({
			disableBoard: true
		})
	}

	triggerWin(){
		this.props.triggerWin()
		this.disableBoard()
	}

	triggerGameOver(){
		this.props.triggerGameOver()
		this.disableBoard()
	}

	checkWin() {
		let numMines = this.state.size
		if (this.state.checksRemaining - numMines - 1 === 0) {
			this.triggerWin()
		}
	}

	checkTile(location) {
		let board = this._board
		let node = this.state.index[location]
		node.wasClicked = true
		
		if (node.isMine()) {
			this.triggerGameOver()
		} else {
			let numChecks = node.check()
			this.checkWin(numChecks)

			// can optimize to not render when this alone changes
			this.setState({
				checksRemaining: this.state.checksRemaining - numChecks,
				index: board.getIndex()	
			})
		}
	}

	resetTimer() {
		clearInterval(this._timerId)
		this.setState({
			timer: 0
		})
	}

	buildTableRow(size, rowNum) {
		let tiles = [];
		for (let i = 0; i < size; i++) {
			let colNum = i;
			let location = '' + rowNum + colNum
			tiles.push(<BoardTile key={i} index={this.state.index} location={location} checkTile={this.checkTile.bind(this)} gameStatus={this.props.gameStatus} disableBoard={this.state.disableBoard}></BoardTile>)
		}

		return (
			<tr key={rowNum}>
				{tiles}
			</tr>
		)
	}

	buildTableRows(size) {
		return new Array(size).fill(null).map((val, index)=>{
			return this.buildTableRow(size, index)
		})
	}

	// not called for initial render
	componentWillReceiveProps(nextProps) {
		if(nextProps.newGame) {
			this._board = new Board(this.props.size).initBoard()
			this.setState({
				index: this._board.getIndex(),
				disableBoard: false
			})
		}
	}

	render() {
		return (
			<div className="game-container">
				<div className="board-container">
					<table>
						<tbody>
							{this.buildTableRows(this.state.size)}
						</tbody>
					</table>
				</div>
			</div>	
		)
	}
}