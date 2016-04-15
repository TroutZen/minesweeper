import _ from 'lodash'

let cellTypes = {
	MINE: 'mine',
	BLANK: 'blank'
}

export class Tile {
	constructor(cellType, location) {
		this.id = location
		this.edges = []
		this.index = {}
		this.row = parseInt(location.substr(0,1))
		this.col = parseInt(location.substr(1,2))
		this.checked = false
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
		this.index[tile.id] = true
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

	isMine(){
		return this.type === cellTypes.MINE ? true : false
	}

	check() {
		// count of how many tiles have been checked (used to track win condition)
		let count = 1
		this.checked = true
		if (this.adjacentMines > 0) {
			this.edges.forEach((edge)=>{
				// only check those tiles that have been been checked yet
				if (!edge.checked) {
					count++
					edge.check()
				}
			})
		}

		return count
	}
}

 export class Board {
	constructor(size){
		this.nodes = [];
		this.index = {} // map of rowcol ('00' for 0th row, 0th col) to nodes
		this.size = size
	}

	find(id) {
		return _.find(this.nodes, (node)=> node.id === id)
	}

	addEdge(startId, endId) {
		let startNode = this.index[startId]
		let endNode = this.index[endId]

		if (startNode && endNode) {
			// prevent adding of redundant edges if already exists
			if(!startNode.index[endId] && !endNode.index[startId]) {
				startNode.addEdge(endNode)
				endNode.addEdge(startNode)
			}

			// however still increment if node is a mine
			if (endNode.type === cellTypes.MINE) {
				startNode.adjacentMines++
			}
		}
	}

	addNode(node) {
		this.nodes.push(node)
	}

	initBoard() {
		let index = this.index = this.createIndices()
		let mineLocations = this.chooseMineIndices()

		// add mines to randomly assigned locations
		mineLocations.forEach((location)=>{
			let mine = new Tile('mine', location)
			index[location] = mine
			this.addNode(mine)
		})

		// fill in gaps with blank tiles (no mines)
		_.each(index, (node, location)=>{
			if (!node) {
				let tile = new Tile('blank', location)
				index[location] = tile
				this.addNode(tile)
			}
		})

		// connect all nodes to their adjacent nodes
		_.each(index, function(node, location){
			let row = parseInt(location.substr(0,1))
			let col = parseInt(location.substr(1,2))
			let adjacentNodes = this.getAdjacentNodes(row, col)
			adjacentNodes.forEach((adjacentNode)=>{
				this.addEdge(node.id, adjacentNode)
			})
		}.bind(this))

		return this
	}

	getAdjacentNodes(row, col) {
		let origin = '' + row + col
		let r0 = row
		let r1 = row - 1 
		let r2 = row + 1
		let rows = [r0, r1, r2]

		let c0 = col
		let c1 = col - 1
		let c2 = col + 1
		let cols = [c0, c1, c2]

		return generateCoordList.call(this)

		function generateCoordList() {
			let size = this.size
			let coordList = []

			let adjRows = _.reject(rows, (row)=>{
				return row < 0 || row > size - 1
			})

			let adjCols = _.reject(cols, (col)=>{
				return col < 0 || row > size - 1
			})

			adjRows.forEach((adjRow)=>{
				adjCols.forEach((adjCol)=>{
					let location = '' + adjRow + adjCol
					// need to exclude origin from adjacent nodes
					if (location !== origin) {
						coordList.push(location)	
					}
				})
			})

			return coordList
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
				indices['' + row + col] = true
				indicesArray.push('' + row + col)
			} else {
				chooseIndex()
			}
		}

		return indicesArray
		// return ["81", "48", "50", "34", "62", "90", "63", "76", "66", "65"]
	}


	createIndices() {
		let size = this.size
		let indices = {}
	
		for (let row = 0; row < size; row++) {
			for (let col = 0; col < size; col++) {
				console.log(row + col)
				indices['' + row + col] = void 0
			}
		}

		return indices
	}

	getTiles(){
		// return new copy of the nodes to pass as state to the UI
		return Object.assign([], this.nodes)
	}

	getIndex() {
		return Object.assign({}, this.index)
	}

	printNodes() {
		let i = 0, l = this.nodes.length
		for (; i < l; i++) {
			console.log(this.nodes[i].id + ':')
			console.log(this.nodes[i].edges)
		}
	}
}

