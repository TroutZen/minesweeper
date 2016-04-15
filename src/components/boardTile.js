import React from 'react'
import classNames from 'classnames';

export class BoardTile extends React.Component {
	constructor(props) {
		super(props)

		let id = props.location
		let tile = props.index[id]
		
		this.state = {
			id: id,
			checked: tile.checked,
			type: tile.type,
			adjacentMines: tile.adjacentMines
		}
	}

	checkTile(event) {
		this.setState({
			checked: true
		})
	}

	render() {
		let prefix = 'mc-'
		let clazz = ''
		let adjacentMines = ''

		if (!this.state.checked) {
			clazz = prefix + 'covered'
		} else {
			if (this.state.type === 'mine') {
				clazz = prefix + 'mine'
			} else {
				clazz = prefix + this.state.adjacentMines
				adjacentMines = this.state.adjacentMines
			}
		}

		return <td onClick={this.checkTile.bind(this)} className={clazz}>{adjacentMines}</td>
	}
}