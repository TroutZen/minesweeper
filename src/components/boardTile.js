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

		if (!tile.checked && !tile.wasClicked) {
			clazz = prefix + 'covered'
		} else {
			if (tile.type === 'mine') {
				clazz = 'em em-alien'
			} else {
				clazz = prefix + tile.adjacentMines
				adjacentMines = tile.adjacentMines
			}
		}

		return <td onClick={this.checkTile.bind(this)} className={clazz}>{adjacentMines}</td>
	}
}