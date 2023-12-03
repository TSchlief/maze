
class Maze {
    constructor(height=15, width=15, fogDistance = 20) {
        this.height = height;
        this.width = width;
        this.fogDistance = fogDistance;
        this.cellCount = height * width;
        this.canEdit = false;
        this.start = null;
        this.end = null;
        this.isStart = true;
        this.tiles = [];
        this.solved = false;
        
        this.turns = 0;
        this.playedTiles = [];
        this.lastPlayedTiles = [];
        
        this.buildMazeStyle();
        this.buildCells();
    }

    buildMazeStyle () {
        const mazeStyle = `grid-template-columns: repeat(${this.height}, 2.5em);
        grid-template-rows: repeat(${this.width}, 2.5em)`;

        document.getElementById("maze").style.cssText = mazeStyle;
    }
    
    buildCells () {
        let cellsHtml = [];
        for(let i = 0; i < this.cellCount; i++){
            
            cellsHtml += `
                <div isedge=${this.isEdge(i) && !this.isCorner(i)}
                iswall="true"
                cellNumber='${i}'
                class="maze-cell"
                id="maze-cell-${i}"
                isstart="false"
                isend="false"
                discovered="true"
                played="false"
                ></div>
            ` 
        }
        
        document.getElementById("maze").innerHTML = cellsHtml;
        
        for(let i = 0; i < this.cellCount; i++){
            let element = document.getElementById(`maze-cell-${i}`);
            element.addEventListener("click", this.handleClick);
            this.tiles.push(element);
        }
        
    }

    isEdge (cellNumber) {
        if( cellNumber < this.width ||
            cellNumber > this.cellCount-this.width-1 ||
            cellNumber % this.width === this.width-1 ||
            cellNumber % this.width === 0) {
            return true;
        }
        return false;
    }

    isCorner (cellNumber) {
        if( cellNumber === 0 ||
            cellNumber === this.width-1 ||
            cellNumber === this.cellCount-1 ||
            cellNumber === this.cellCount - this.width) {
                console.log("corner")
            return true;
        }
        return false;
    }
    
    //resets tiles
    addFog () {
        console.log(this.tiles)
        this.playedTiles = [];
        this.lastPlayedTiles = [];
        for(const tile in this.tiles) {
            let element = this.tiles[tile];
            if (element.getAttribute("isstart") === "true"){
                element.setAttribute("discovered", "true");
                element.setAttribute("played", "false");
            }
            else{
                element.setAttribute("discovered", "false");
                element.setAttribute("played", "false");
            }
        }
    }

    checkValidMaze () {
        let set = new Set();
        let queue = [];

        const startingIndex = parseInt(this.start.getAttribute("cellnumber"));
        set.add(startingIndex);
        queue.push(startingIndex);
        console.log("startingIndex", startingIndex)

        let count = 0;
        while (queue.length > 0 && count < 50) {
            count++;
            let currentIndex = queue.shift();
            console.log("currentIndex", currentIndex)
            let directions = this.travelDirections(currentIndex);
            console.log("directions", directions)
            for(let i = 0; i < directions.length; i++){
                let element = this.tiles[directions[i]];
            
                //if element is end then maze is valid return true
                if(element.getAttribute("isend") === "true") {
                    console.log("steps", count);
                    return true;
                }
                //if element is not a wall add its index to queue
                if(element.getAttribute("iswall") === "false"){
                    if(!set.has(directions[i])) {
                        set.add(directions[i]);
                        queue.push(directions[i]);
                        
                    }
                }
            }
            
        }
        console.log("steps", count);
        return false;
    }

    //when navigating a 2d array using only a list of increasing numbers
    //determines directions of possible travel and returns indexes
    travelDirections(index) {
        let directions = [];
        //we can add up and down direction if they are not over or under the 2d array
        if (index - this.width >= 0) {
            directions.push(index - this.width);
        }
        if (index + this.width < this.cellCount) {
            directions.push(index + this.width);
        }
        //if index is on the left side of the 2d array travel only right
        if(index % this.width === 0) {
            directions.push(index + 1);
        }
        //if index is on the right size of the 2d array travel only left
        else if(index % this.width === this.width-1) {
            directions.push(index - 1);
        }
        else {
            directions.push(index + 1);
            directions.push(index - 1);
        }
        return directions;
    }

    handleTurnEvent() {
        this.turns++;
        console.log(this.turns)
        this.playedTiles.push(this.lastPlayedTiles)
        this.lastPlayedTiles = [];
        
        if (this.playedTiles.length > this.fogDistance){
            let resetTiles = this.playedTiles.shift();
            for(let i = 0; i < resetTiles.length; i++) {
                resetTiles[i].setAttribute("discovered", "false");
                resetTiles[i].setAttribute("played", "false");
            }
        }
        
    }

    removeFog () {
        for(const tile in this.tiles) {
            this.tiles[tile].setAttribute("discovered", "true");
        }
    }

    editMaze (element) {
        const cellNumber = parseInt(element.getAttribute("cellnumber"));

        if(element.getAttribute("isedge") === "true" && !this.isCorner(cellNumber)){
            if(this.start && this.end){
                this.isStart = true;
                this.start.setAttribute("iswall", "false")
                this.start.setAttribute("isstart", "false")
                this.end.setAttribute("iswall", "false")
                this.end.setAttribute("isend", "false")
                this.start = null;
                this.end = null;
            }
            else if(this.isStart){
                if(this.start){
                    this.start.setAttribute("iswall", "false")
                    this.start.setAttribute("isstart", "false")
                }
                this.start = element;
                this.isStart = false;
                element.setAttribute("iswall", "true");
                element.setAttribute("isstart", "true");
                
            }
            else{
                if(element === this.start){return}
                if(this.end){
                    this.end.setAttribute("isend", "false")
                    this.end.setAttribute("iswall", "false")
                }
                this.end = element;
                this.isStart = true;
                element.setAttribute("isend", "true");
                element.setAttribute("iswall", "true");
            }
        }

        let iswall;
        if(element.getAttribute("iswall") === "true"){
            iswall = "false";
        }
        else{
            iswall = "true";
        }
        element.setAttribute("iswall", iswall);
        
        console.log("clicked",cellNumber);
    }

    playMaze(element){
        
        //return if unplayable tile is clicked
        if(element.getAttribute("discovered") === "false" || element.getAttribute("iswall") === "true") {
            return;
        }
 
        this.handleTurnEvent();
        const cellNumbers = [];
        const playedCells = [];
        cellNumbers.push(parseInt(element.getAttribute("cellnumber")));
        this.travelDirections(cellNumbers[0])
        cellNumbers.push(cellNumbers[0] + 1);
        cellNumbers.push(cellNumbers[0] - 1);
        cellNumbers.push(cellNumbers[0] + this.width);
        cellNumbers.push(cellNumbers[0] - this.width);
        
        
        for(let i = 0; i < 5; i++) {
            let target = document.getElementById(`maze-cell-${cellNumbers[i]}`);
            if(cellNumbers[i] < this.cellCount && cellNumbers[i] > -1 && target.getAttribute("iswall") === "false"){
                if(!this.isEdge(cellNumbers[i]) || target.getAttribute("isend") === "true"){
                    target.setAttribute("discovered", true) ;
                    this.lastPlayedTiles.push(target);
                }
            }
        }
        element.setAttribute("played", "true");

        
    }
    
    handleClick = (event) => {
        if(this.canEdit){
            console.log("canEdit")
            this.editMaze(event.target)
        }
        else{
            this.playMaze(event.target);
        }
    }


}



