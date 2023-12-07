

    const editBtn = document.getElementById("edit-btn");
    const playBtn = document.getElementById("play-btn");
    const randomBtn = document.getElementById("random-btn");
    
  
   

    const handleMazeWin = ()=>{
        victory.open();
    }

    const handleVictoryClose = () =>{
        handleRandomBtn()
       
    }
    
    const handleEditBtn =(event) => {
        maze.enableEditMode();
        victory.close();
        console.log("clicked edit");
    }
   
    const handlePlayBtn =(event) => {
        console.log("clicked play");
        victory.close();
        maze.enablePlayMode();
        
    }    
    
    const handleRandomBtn =(event) => {
        console.log("clicked random");
        maze.createRandomMaze();
        victory.close();
        maze.enablePlayMode();
        
        
    }   
    
   
    
    document.getElementById("edit-btn").addEventListener("click", handleEditBtn);
    document.getElementById("play-btn").addEventListener("click", handlePlayBtn);
    document.getElementById("random-btn").addEventListener("click", handleRandomBtn);
    

    var maze = new Maze(handleMazeWin);
    var victory = new Victory("victory-wrapper", "maze", handleVictoryClose);
    maze.createRandomMaze();
    maze.enablePlayMode();








