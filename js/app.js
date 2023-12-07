

    const editBtn = document.getElementById("edit-btn");
    const playBtn = document.getElementById("play-btn");
    const randomBtn = document.getElementById("random-btn");
    
    var maze = new Maze();
    maze.createRandomMaze();
    maze.enablePlayMode();
   

 
    
    const handleEditBtn =(event) => {
        
        maze.enableEditMode();
        console.log("clicked edit");
    }
   
    const handlePlayBtn =(event) => {
        console.log("clicked play");

        maze.enablePlayMode();
        
    }    
    
    const handleRandomBtn =(event) => {
        console.log("clicked random");
        maze.createRandomMaze();
        maze.enablePlayMode();
        
        
    }
    



    document.getElementById("edit-btn").addEventListener("click", handleEditBtn);
    document.getElementById("play-btn").addEventListener("click", handlePlayBtn);
    document.getElementById("random-btn").addEventListener("click", handleRandomBtn);
    









