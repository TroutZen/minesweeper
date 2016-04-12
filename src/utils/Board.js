let cellTypes = {
	MINE: 'mine',
	BLANK: 'blank'
}

export class Node {
	constructor(cellType, id) {
		this.id = id
		this.edge_list = []
		this.row = null
		this.col = null

		switch(cellType) {
			case cellTypes.MINE:
				this.type = cellTypes.MINE
				break

			case cellTypes.BLANK:
				this.type = cellTypes.BLANK
				this.adjacentMines = 0
				break
		}
	}
}


export class Board {
	constructor(){
		this.node_list = [];
	}

	// addEdge(start, end) {
	// 	let first = 
	// }
}

