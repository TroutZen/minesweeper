import React from 'react'
import classNames from 'classnames';

export class BoardTile extends React.Component {
	constructor(props) {
		super(props)
	}

	checkTile() {
		this.props.checkTile(this.props.location)
	}

	render() {
		let tile = this.props.index[this.props.location]
		let prefix = 'mc-'
		let clazz = ''
		let adjacentMines = ''
		let clickHandler = void 0

		if (this.props.disableBoard) {
			clickHandler = () => {
				return void 0
			}
		} else {
			clickHandler = this.checkTile.bind(this)
		}

		if (!tile.checked && !tile.wasClicked) {
			clazz = prefix + 'covered'
		} else {
			if (tile.type === 'mine') {
				clazz = 'mc-mine em em-alien'
			} else {
				clazz = prefix + tile.adjacentMines
				adjacentMines = tile.adjacentMines
			}
		}

		return <td onClick={clickHandler} className={clazz}>{adjacentMines}</td>
	}
}