import React from 'react'

export class Tile extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
		// let id = props.location
		// let tile = this.index[id]
		
		// this.state = {
		// 	id: id,
		// 	checked: tile.checked,
		// 	type: tile.type,
		// 	adjacentMines: tile.adjacentMines
		// }
	}

	checkTile(event) {
		alert(this.props.type)
	}

	render() {
		<td onClick={this.checkTile(event)}></td>
	}
}