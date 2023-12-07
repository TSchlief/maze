

    const editBtn = document.getElementById("edit-btn");
    const playBtn = document.getElementById("play-btn");
    const randomBtn = document.getElementById("random-btn");
    const scoreDisplay = document.getElementById("score");

  
    function reset(){
        victory.close();
        scoreDisplay.innerHTML = 0;

    }

    const handleMazeWin = (score)=>{
        victory.open();

    }

    const handleVictoryClose = () =>{
        handleRandomBtn()
       
    }
    
    const handleEditBtn =(event) => {
        maze.enableEditMode();
        reset()
        console.log("clicked edit");
    }
   
    const handlePlayBtn =(event) => {
        console.log("clicked play");
        reset()
        maze.enablePlayMode();
        
    }    
    
    const handleRandomBtn =(event) => {
        console.log("clicked random");
        maze.createRandomMaze();
        reset()
        maze.enablePlayMode();
        
        
    }      
    const handleMazeClick =(event) => {
        console.log("clicked maze");
        scoreDisplay.innerHTML = maze.turns;



        
        
        
    }   
    
   
 
    

    var maze = new Maze(handleMazeWin);
    var victory = new Victory("victory-wrapper", "maze", handleVictoryClose);
    maze.createRandomMaze();
    maze.enablePlayMode();


    
    document.getElementById("maze").addEventListener("click", handleMazeClick);
    document.getElementById("edit-btn").addEventListener("click", handleEditBtn);
    document.getElementById("play-btn").addEventListener("click", handlePlayBtn);
    document.getElementById("random-btn").addEventListener("click", handleRandomBtn);





