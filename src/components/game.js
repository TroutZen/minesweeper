import React from 'react'
import {Board, Tile} from '../utils/Board'
import {gameStates} from '../constants/gameStates'
import {BoardTile} from './boardTile'
import classNames from 'classNames'

export class Game extends React.Component {

	constructor(props) {
		super(props)
		let Board = props.board
		this._board = new Board(props.size).initBoard() // graph of interconnected cells

		this.state = {
			size: props.size,
			flagsLeft: props.size,
			timer: 0,
			index: this._board.getIndex(),
			checksRemaining: props.size * props.size,
			disableBoard: false,
			timerId: null
		}
	}

	startTimer() {
		if (this.state.timerId) {
			this.clearTimer(this.state.timerId)
		}

		let timerId = setInterval(() => {
			this.setState({
				timer: ++this.state.timer
			})
		}
		, 1000)
		
		this.setState({
			timerId: timerId
		})
	}

	disableBoard() {
		this.setState({
			disableBoard: true
		})
	}

	triggerWin(){
		this.clearTimer(this.state.timerId)
		this.props.triggerWin()
		this.disableBoard()
	}

	triggerGameOver(){
		this.clearTimer(this.state.timerId)
		this.props.triggerGameOver()
		// TODO: Invesitgate antipattern of settings state sequentially vs. one call with all changed props
		this.disableBoard()
	}

	checkWin() {
		let numMines = this.state.size
		if (this.state.checksRemaining - numMines - 1 === 0) {
			this.triggerWin()
		}
	}

	wasFirstClick(numChecks) {
		let checksRemaining = this.state.checksRemaining
		let totalChecks = this.state.size * this.state.size
		return (totalChecks - numChecks === checksRemaining) ? true: false
	}

	checkTile(location) {

		let board = this._board
		let node = this.state.index[location]
		node.wasClicked = true

		if (node.isMine()) {
			this.triggerGameOver()
		} else {
			let numChecks = node.check()

			if (this.wasFirstClick) {
				this.startTimer()
			}

			this.checkWin(numChecks)

			// can optimize to not render when this alone changes
			this.setState({
				checksRemaining: this.state.checksRemaining - numChecks,
				index: board.getIndex()	
			})
		}
	}

	clearTimer(timerId){
		clearInterval(timerId)
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
			this.clearTimer(this.state.timerId)

			this.setState({
				index: this._board.getIndex(),
				disableBoard: false,
				timer: 0,
				checksRemaining: this.state.size * this.state.size,
				flagsLeft: this.state.size
			})
		}
	}

	render() {
		let timerClass = classNames({
			hidden: this.state.timer === 0,
			timer: true
		})

		return (
			<div className="main-content-container">
				<div className="game-container">
					<div className={timerClass}>{this.state.timer}</div>
					<div className="board-container">
						<table>
							<tbody>
								{this.buildTableRows(this.state.size)}
							</tbody>
						</table>
					</div>
				</div>	
			</div>
		)
	}
}