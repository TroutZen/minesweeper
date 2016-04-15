# MINESWEEPER (WIP)

Technologies used: React, ES6, Webpack,SASS

Description: 
Utilized graph data structure for modeling board tiles. When the board is initialized, random locations are assigned for the mine nodes and the remaining locations are assigned for the non-mine nodes. Nodes are cached by their id which is a concatenation of their row and col number for constant time lookup which is leveraged during run time. For each node, an algorithm detects the adjacent nodes and connects those nodes if a connection doesn't exist. These connections are then used when a user clicks on a cell to determine whether an adjacent cell should be uncovered.

## TODO's

* Add timer
* Add win condition (When checked nodes = board size ^ 2 - mines)
* add reset game to reinit game state
* add flags
* more styling

``` npm install ```
```npm run start-dev```

localhost:3000


