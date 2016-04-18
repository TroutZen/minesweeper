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
			adjacentMines: tile.adjacentMines,
			wasClicked: false,
			index: props.index
		}
	}

	checkTile() {
		this.props.checkTile(this.state.id)
	}

	componentWillReceiveProps(nextProps){
		let tile = this.props.index[nextProps.location]

		this.setState({
			id: tile.id,
			checked: tile.checked,
			wasClicked: tile.wasClicked,
			type: tile.type,
			adjacentMines: tile.adjacentMines,
			index: nextProps.index
		})
	}

	render() {
		let prefix = 'mc-'
		let clazz = ''
		let adjacentMines = ''

		if (!this.state.checked && !this.state.wasClicked) {
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