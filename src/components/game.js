import React from 'react'

export class Game extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			size: 10,
			minesLeft: 10,
			timer: 0
		}
	}

	buildTableRow(size) {
		var tableCells = [];
		for (var i = 0; i < size; i++) {
			// tableCells.push(<Cell className="ms-cell" key={i}></Cell>)
			tableCells.push(<td className="ms-cell" key={i}></td>)
		}

		return (
			<tr>
				{tableCells}
			</tr>

		)
	}

	render() {
		return (
			<div className="game-container">
				<div>
					<div>{this.state.minesLeft}</div>
					<div>{this.state.timer}</div>
				</div>	
				<table>
					<tbody>
						{this.buildTableRow(this.state.size)}
					</tbody>
				</table>		
			</div>	
		)
	}
}