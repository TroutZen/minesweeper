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
			markedWithFlag: false,
			markedWithQuestion: false
		}
	}

	toggleChecked(){
		this.setState({checked: true})
	}

	checkTile() {
		this.props.checkTile(this.state.id)
	}

	componentWillReceiveProps(nextProps){
		let tile = this.props.index[this.state.id]

		this.setState({
			checked: tile.checked
		})
	}

	componentDidUpdate(prevProps, prevState) {
		if (!prevState.checked && this.state.checked) {
			this.checkTile()	
		}
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

		return <td onClick={this.toggleChecked.bind(this)} className={clazz}>{adjacentMines}</td>
	}
}