import React from 'react'
import classNames from 'classnames';

export class BoardTile extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			rightClicked: false
		}
	}

	checkTile() {
		this.props.checkTile(this.props.location)
	}

	rightClick(event) {
		event.preventDefault()
		this.setState({
			rightClicked: !this.state.rightClicked
		})
	}

	handleClick(event) {
		// better to unbind and then rebind, this will cause a memory leak
		// if the board is disabled after game over or a flag is currently applied
		if (this.props.disableBoard || this.state.rightClicked) {	
			return;
		} else {
			this.checkTile()
		}
	}

	render() {
		let tile = this.props.index[this.props.location]
		

		let covered = !tile.checked && !tile.wasClicked && !this.state.rightClicked
		let numAdjacentClass = ''
		if (tile.checked && tile.type !== 'mine') {
			numAdjacentClass = `mc-${tile.adjacentMines}`
		}
		
		let tileClass = classNames({
			'mc-covered': covered,
			'mc-mine em em-alien': tile.wasClicked && tile.type === 'mine',
			'mc-flagged': !tile.checked && this.state.rightClicked
		}, numAdjacentClass)

		let innerText = ''
		if (!covered && !this.state.rightClicked) {
			if (tile.type !== 'mine') {
				if (tile.adjacentMines > 0) {
					innerText = tile.adjacentMines;		
				}
			}
		}

		return <td onClick={this.handleClick.bind(this)} onContextMenu={this.rightClick.bind(this)} className={tileClass}>{innerText}</td>
	}
}