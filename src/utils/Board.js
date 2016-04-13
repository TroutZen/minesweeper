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
		// initialized to value of 0 and set when game state is initialized
		this.adjacentMines = 0	

		switch(cellType) {
			case cellTypes.MINE:
				this.type = cellTypes.MINE
				break

			case cellTypes.BLANK:
				this.type = cellTypes.BLANK
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
	constructor(size){
		this.nodes = [];
		this.index = {}
		this.size = size
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

	addNode(node) {
		this.nodes.push(node)
	}

	copy() {
		return JSON.parse(JSON.stringify(this))
	}

	createGame() {
		this.index = createIndices()
		let mineLocations = chooseMineIndices()

		// add mines to randomly assigned locations
		mineLocations.forEach((location)=>{
			mine = new Tile('mine')
			this.index[location] = mine
			this.addNode(mine)
		})

		// fill in gaps with blank tiles (no mines)
		for (let [location, node] of this.index) {
			if (!node) {
				this.index[location] = new Tile('blank')
			}
		}

		// connect all nodes to their adjacent nodes
		for (let [location, node] of this.index) {
			let row = parseInt(location.substr(0,1))
			let col = parseInt(location.substr(1,2))
			let adjacentNodes = getAdjacentNodes(row, col)
			adjacentNodes.forEach((adjacentNode)=>{
				this.addEdge(node, adjacentNode)
			})
		}
	}

	getAdjacentNodes(row, col) {
		let r0 = row
		let r1 = row - 1 
		let r2 = row + 1
		let rows = [r0, r1, r2]

		let c0 = col
		let c1 = col - 1
		let c2 = col + 1
		let cols = [c0, c1, c2]

		return generateCoordList()

		function generateCoordList() {

			let coordList = []

			let rowsNew = _.reject(rows, (row)=>{
				return row < 0 || row > this.size - 1
			})

			let colsNew = _.reject(cols, (col)=>{
				return col < 0 || row > this.size - 1
			})

			rowsNew.forEach((row)=>{
				colsNew.forEach((col)=>{
					coordList.push([row, col])
				})
			})

			return coordList.map((coords)=>{
				return coords.join('')
			})
		}
	}

	printNodes() {
		let i = 0, l = this.nodes.length
		for (; i < l; i++) {
			console.log(this.nodes[i].id + ':')
			console.log(this.nodes[i].edges)
		}
	}

	chooseMineIndices() {
		let size = this.size
		let count = 0
		let indices = {}
		let indicesArray = []
		while (count < size) {
			chooseIndex()
			count++
		}

		function chooseIndex() {
			let row = Math.floor(Math.random() * size)
			let col = Math.floor(Math.random() * size)
			if (!indices['' + row + col]) {
				indicesArray.push('' + row + col)
			} else {
				chooseIndex()
			}
		}

		return indicesArray
	}

	createIndices() {
		let size = this.size
		let indices = {}
		let row, col = 0

		for (; i < size; i++) {
			for (; j < size; j++) {
				indices['' + i + j] = void 0
			}
		}

		return indices
	}
}

