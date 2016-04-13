import _ from 'lodash'

let cellTypes = {
	MINE: 'mine',
	BLANK: 'blank'
}

export class Tile {
	constructor(cellType, row, col) {
		this.id = '' + row + col
		this.edges = []
		this.row = null
		this.col = null
		this.isVisible = false

		switch(cellType) {
			case cellTypes.MINE:
				this.type = cellTypes.MINE
				break

			case cellTypes.BLANK:
				this.type = cellTypes.BLANK
				// initialized to value of 0 and set when game state is initialized
				this.adjacentMines = 0
				break
		}
	}

	addEdge(tile) {
		this.edges.push(tile)
	}

	countAdjacentMines(){
		let count = 0
		this.edges.forEach((edge)=>{
			if (edge.type === cellTypes.MINE) {
				count++
			}
		})

		return count
	}

	check() {
		this.isVisible = true
		if (this.type === cellTypes.MINE) {
			return 'GAME_OVER'
		} else if (this.adjacentMines > 0) {
			this.edges.forEach((edge)=>{
				check()
			})
		}
	}
}

 export class Board {
	constructor(){
		this.nodes = [];
	}

	find(id) {
		return _.find(this.nodes, (node)=> node.id === id)
	}

	addEdge(startId, endId) {
		let startNode = this.find(startId)
		let endNode = this.find(endId)

		if (startNode && endNode) {
			startNode.addEdge(endNode)
			endNode.addEdge(startNode)
		}
	}

	printNodes() {
		let i = 0, l = this.nodes.length
		for (; i < l; i++) {
			console.log(this.nodes[i].id + ':')
			console.log(this.nodes[i].edges)
		}
	}
}

