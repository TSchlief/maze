class MazeNode {
    constructor(x, y, numPaths) {
        this.numPaths = numPaths;
        this.left = null;
        this.right =null;
        this.top =null;
        this.bottom =null;
        this.x = x;
        this.y = y;
    }
}

class Maze {
    constructor(width=10, height=10, intersectionWeight=5, stepWeight=5){
        
        
        this.width = width;
        this.height = height;
        this.intersectionWeight = intersectionWeight;
        this.stepWeight = stepWeight;
        this.DIRECTIONS = ["left", "right", "top", "bottom"];
        this.intersection = new Intersection();
        this.start = null;
        this.end = null;
    }

    //returns random number in range. Inclusive.
    randomRange(start, end) {
        return Math.floor(Math.random()*(end+start+1)+start);
    }

    //returns edge side if the coodinate is an edge piece
    edge(x, y) {

        if(x === 0){
            return "left";
        }
        else if(x === this.width-1){
            return "right";
        }
        else if(y === 0){
            return "bottom";            
        }
        else if(this.height-1){
            return "top";
        }
        else{
            return false;
        }
    }    
    
    //returns direction of travel if on edge
    edgeDirection(x, y) {

        if(x === 0){
            return "right";
        }
        else if(x === this.width-1){
            return "left";
        }
        else if(y === 0){
            return "top";            
        }
        else if(this.height-1){
            return "bottom";
        }
        else{
            return false;
        }
    }

    //returns true if the coordinate is on the maze
    isMaze(x, y) {
        if(x > -1 && x < this.width && y > -1 && y < this.height) {
            return true;
        }
        return false;
    }

    //returns true if node is out of bounds assign termination values
    checkOutOfBoundsNode(x, y, node) {
        if(!this.isMaze){
            node.left = -1;
            node.right = -1;
            node.top = -1;
            node.bottom = -1;
            return true;
        }
        return false;
    }

    //returns true if node is on edge set its termination values
    checkEdgeNode(node) {
        if(this.edge){
            node.left = -1;
            node.right = -1;
            node.top = -1;
            node.bottom = -1;
            node[this.edge()] = null;
            return true;
        }
        return false;
    }

    //manually set the maze starting tile
    setStart(x, y) {
        let newNode = new MazeNode(x, y, 1);
        //assing boundries
        this.checkEdgeNode(newNode);
        //remove previous maze
        this.start = null;
        //set start node
        this.start = newNode;
        return this.start;
    }

    createMaze(x , y){
        //if not an edge tile we cant create the maze
        if(!this.edge(x, y)) return false;
        
        //create start node
        let currentNode = this.setStart(x, y);
        for(let i = 0; i < 5; i++){
            console.log(currentNode);
            
        }
        
    }


    
}

//controls the number of paths each node will have
//
class Intersection {
    constructor () {
        this.numbers = [25,25,25,25];
        this.probablility = [];
        this.buildPathProbablility();
    }

    //builds probablitliy array by pushing amt of each number onto it
    buildPathProbablility () {
        this.probablility = [];
        for(let i = 0; i < 4; i++){
            for(let j = 0; j < this.numbers[i]; j++){
                this.probablility.push(i);
            }
        }
    }
    
    //gets the number of paths at an intersection
    getPathCount(){
        //get random number from 0 to 100 inclusive
        const randomNumber = Math.floor(Math.random()*(100))
        //randomNumber selects and returns number of paths at intersection
        return this.probablility[randomNumber];
    }

    //takes an array agument to modify the path probabilities, returns true if adds to 100
    modifyAllPathProbablility (values) {
        let count = 0;
        for(let i = 0; i < 4; i++){
            count += values[i];
            if(values[i] < 0){ 
                return false;
            }
        }
        if(count === 100){
            this.numbers = [...values];
            this.buildPathProbablility();
            return true;
        }
        return false;
    }

    //increase one path probability and decrease another
    modifyTwoPathProbablility(increase, decrease, amt){
        this.numbers[increase] += amt;
        this.numbers[decrease] -= amt;
        if(this.numbers[decrease] < 0 ){
            return false;
        }
        this.buildPathProbablility()
        return true;
    } 
} 

let maze = new Maze();
console.log(maze.intersection.getPathCount())
console.log(maze.createMaze(5,0));
