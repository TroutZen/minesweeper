import React from 'react'

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
		
	}

	render() {
		return <td onClick={this.checkTile.bind(this)}>meow</td>
	}
}