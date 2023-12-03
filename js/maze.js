
class Maze {
    constructor(height=15, width=15) {
        this.height = height;
        this.width = width;
        this.cellCount = height * width;
        this.canEdit = false;
        this.start = null;
        this.end = null;
        this.isStart = true;
        this.tiles = [];
        
        this.turns = 0;
        this.playedTiles = [];
        
        this.buildMazeStyle();
        this.buildCells();
    }

    buildMazeStyle () {
        const mazeStyle = `grid-template-columns: repeat(${this.height}, 2em);
        grid-template-rows: repeat(${this.width}, 2em)`;

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
                >${i}</div>
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

    handleTurnEvent(playedCells) {
        this.turns++;
   
        console.log(playedCells)
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
        //mark selected cell as played
        if(element.getAttribute("played") === "false"){
            element.setAttribute("played", "true")
            console.log("turn");
        }
        //return if tile was already played
        else{
            return;
        }

        const cellNumbers = [];
        const playedCells = [];
        cellNumbers.push(parseInt(element.getAttribute("cellnumber")));
        cellNumbers.push(cellNumbers[0] + 1);
        cellNumbers.push(cellNumbers[0] - 1);
        cellNumbers.push(cellNumbers[0] + this.width);
        cellNumbers.push(cellNumbers[0] - this.width);

        for(let i = 0; i < 5; i++) {
            let target = document.getElementById(`maze-cell-${cellNumbers[i]}`);
            if(cellNumbers[i] < this.cellCount && cellNumbers[i] > -1 && target.getAttribute("iswall") === "false"){
                if(!this.isEdge(cellNumbers[i]) || target.getAttribute("isend") === "true"){
                    target.setAttribute("discovered", true) ;
                    playedCells.push(target);
                }
            }
        }

        this.handleTurnEvent(playedCells);
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



