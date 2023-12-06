const mazeColors = {
    wall: "grey",
    path: "#4E8F16",
    start: "rgb(42, 207, 51)",
    end: "#dd9222",
    discovered: "rgb(4, 24, 4)",
    played: "#334fdb",
    border: "rgb(51, 104, 65)"
}

class Maze {
    constructor(rows=17, columns=17, fogDistance = 15, colors = mazeColors ){
        this.rows = rows;
        this.columns = columns;
        this.fogDistance = fogDistance;
        this.colors = colors;
        this.cellCount = rows * columns;
        this.mode = "edit";
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
        const mazeStyles = `
        #maze{
            display: grid;
            height: 100%;
            width: 100%;
            grid-template-columns: repeat(${this.columns}, minmax(0, auto));
            grid-template-rows: repeat(${this.rows}, minmax(0, auto));
        }
        .maze-cell {
            display: block;
            height: 100%;
            width: 100%;
            border: 2px solid ${this.colors.border};
        }
        
        .maze-cell[iswall="true"] {
            background-color: ${this.colors.wall};
        }
        
        .maze-cell[iswall="false"] {
            background-color: ${this.colors.path};
        }
        
        .maze-cell[endpoints="start"] {
            background-color: ${this.colors.start};
        }
        .maze-cell[endpoints="end"] {
            background-color: ${this.colors.end};
        }
        
        .maze-cell[discovered="false"] {
            background-color: ${this.colors.discovered}
        }

        .maze-cell[played="true"] {
            background-color: ${this.colors.played}
        }

        `;
        const styleTag = document.createElement("style");
        styleTag.innerHTML = mazeStyles;
        document.head.appendChild(styleTag);
    }
    
    buildCells () {
        let cellsHtml = [];
        for(let i = 0; i < this.cellCount; i++){
            
            cellsHtml += `
                <div 
                iswall="true"
                cellNumber='${i}'
                class="maze-cell"
                id="maze-cell-${i}"
                endPoints="false"
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
    
    //resets tiles
    reset () {
        this.playedTiles = [];
        this.lastPlayedTiles = [];
        for(const tile in this.tiles) {
            let element = this.tiles[tile];
            if (element.getAttribute("endPoints") === "start"){
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

        let count = 0;
        while (queue.length > 0) {
            count++;
            let currentIndex = queue.shift();
            let directions = this.travelDirections(currentIndex);
            for(let i = 0; i < directions.length; i++){
                let element = this.tiles[directions[i]];
            
                //if element is end then maze is valid return true
                if(element.getAttribute("endPoints") === "end") {
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
        return false;
    }

    checkFog (cellNumber) {
        let set = new Set();
        let queue = [];

        set.add(cellNumber);
        queue.push(cellNumber);

        let count = 1;
        while (queue.length > 0) {
            let currentIndex = queue.shift();
            let directions = this.travelDirections(currentIndex);

            if(this.fogDistance < count){
                
                this.tiles[currentIndex].setAttribute("discovered", false);
                this.tiles[currentIndex].setAttribute("played", false);
                    
            }

            for(let i = 0; i < directions.length; i++){
                let element = this.tiles[directions[i]];
                
                //if element is not a wall add its index to queue
                if(element.getAttribute("iswall") === "false"){
                    if(!set.has(directions[i])) {
                        set.add(directions[i]);
                        queue.push(directions[i]);
                        //if tile is discovered we count it
                        if(element.getAttribute("played") === "true"){
                            count++;
                        }
                    }
                }

            }
        }
        
        
    }

    //when navigating a 2d array using only a list of increasing numbers
    //determines directions of possible travel and returns indexes
    travelDirections(index) {
        let directions = [];
        //we can add up and down direction if they are not over or under the 2d array
        if (index - this.columns >= 0) {
            directions.push(index - this.columns);
        }
        if (index + this.columns < this.cellCount) {
            directions.push(index + this.columns);
        }
        //if index is on the left side of the 2d array travel only right
        if(index % this.columns === 0) {
            directions.push(index + 1);
        }
        //if index is on the right size of the 2d array travel only left
        else if(index % this.columns === this.columns-1) {
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
        
        
    }

    removeFog () {
        for(const tile in this.tiles) {
            this.tiles[tile].setAttribute("discovered", "true");
        }
    }

    enableEditMode (){
        this.reset();
        this.removeFog();
        this.mode = "edit";
    }

    enablePlayMode () {
        if(this.checkValidMaze()){
            this.mode = "play";
            this.reset();
            return true;
        }
        return false;
    }
    createRandomEndpoints(){
        if(this.start){
            this.start.setAttribute("iswall", "true");
            this.start.setAttribute("endPoints", "false");
        }

        if(this.end){
            this.end.setAttribute("iswall", "true");
            this.end.setAttribute("endPoints", "false");
        }  

        this.start = this.tiles[this.randomRange(0, this.tiles.length)];
        this.end = this.tiles[this.randomRange(0, this.tiles.length)];
        
        while(this.start === this.end){
            this.end = this.tiles[this.randomRange(0, this.tiles.length)];
        }

        this.start.setAttribute("iswall", "false");
        this.start.setAttribute("endPoints", "start");
        this.end.setAttribute("endPoints", "end");
        this.end.setAttribute("iswall", "false");
    }

    randomRange(start, end) {
        return Math.floor(Math.random()*(end+start)+start);
    }
    randomPath(startingIndex) {
        let set = new Set();
        let queue = [];

        set.add(startingIndex);
        queue.push(startingIndex);

        let count = 0;
        while (queue.length > 0 && count < 500) {
            count++;
            let currentIndex = queue.pop();
            
            let directions = this.travelDirections(currentIndex);
            let i = this.randomRange(0,directions.length)
            let element = this.tiles[directions[i]];
        
      
            //if element is not a wall add its index to queue
            
                if(!set.has(directions[i])) {
                    queue.push(directions[i]);
                    set.add(directions[i])
                    element.setAttribute("iswall", "false");
                    
                }
            
            
            
        }
        if(!this.checkValidMaze()){
            this.randomPath(this.randomRange(0, this.cellCount-1))
        }
    }

    createRandomMaze () {
        for(let i = 0; i < this.tiles.length; i++){
            this.tiles[i].setAttribute("iswall", "true");
        }
        this.createRandomEndpoints();
      
        this.randomPath(parseInt(this.start.getAttribute("cellnumber")));
    }

    editMaze (element) {
        const cellNumber = parseInt(element.getAttribute("cellnumber"));

            
        if(element === this.start){
            element.setAttribute("iswall", "true");
            element.setAttribute("endPoints", "false");
            this.start = null;
        }

        else if(element  === this.end){
            element.setAttribute("iswall", "true");
            element.setAttribute("endPoints", "false");
            this.end = null;
        }         
           
        else if(!this.start){
            if(element === this.end){return}
            
            this.start = element;
            element.setAttribute("iswall", "false");
            element.setAttribute("endPoints", "start");
            
        }
        else if (!this.end){
            if(element === this.start){return}
            
            this.end = element;
            element.setAttribute("endPoints", "end");
            element.setAttribute("iswall", "false");
        }
        else{
            if(element.getAttribute("iswall") === "true"){
                element.setAttribute("iswall", "false");
            }
            else{
                element.setAttribute("iswall", "true");
            }
            
        }
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
        cellNumbers.push(...this.travelDirections(cellNumbers[0]))
        
        this.checkFog(cellNumbers[0])
        
        for(let i = 0; i < 5; i++) {
            let target = document.getElementById(`maze-cell-${cellNumbers[i]}`);
            if(cellNumbers[i] < this.cellCount && cellNumbers[i] > -1 && target.getAttribute("iswall") === "false"){
              //  if(!this.isEdge(cellNumbers[i]) || target.getAttribute("endPoints") === "end"){
                    target.setAttribute("discovered", true) ;
                    this.lastPlayedTiles.push(target);
             
            }
        }
        element.setAttribute("played", "true");
        

        
    }
    
    handleClick = (event) => {
        if(this.mode === "edit"){
            this.editMaze(event.target)
        }
        else{
            this.playMaze(event.target);
        }
    }


}



