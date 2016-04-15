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
			timer: 0,
			gameState: gameStates.newGame,
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
		let node = this.state.index[location]
		
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

	buildTableRow(size, rowNum) {
		let tiles = [];
		for (let i = 0; i < size; i++) {
			let colNum = i;
			let location = '' + rowNum + colNum
			tiles.push(<BoardTile key={i} index={this.state.index} location={location} checkTile={this.checkTile.bind(this)}></BoardTile>)
		}

		return (
			<tr>
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