

    const editBtn = document.getElementById("edit-btn");
    const playBtn = document.getElementById("play-btn");
    var maze = new Maze();
   

 
    
    const handleEditBtn =(event) => {
        
        maze.enableEditMode();
        console.log("clicked edit");
    }
   
    const handlePlayBtn =(event) => {
        console.log("clicked play");

        maze.enablePlayMode();
        
    }




    document.getElementById("edit-btn").addEventListener("click", handleEditBtn);
    document.getElementById("play-btn").addEventListener("click", handlePlayBtn);










