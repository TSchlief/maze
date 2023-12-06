

    const createBtn = document.getElementById("create-btn");
    const editBtn = document.getElementById("edit-btn");
    const submitBtn = document.getElementById("submit-btn");
    const playBtn = document.getElementById("play-btn");
    var maze = new Maze();
   

    const handleCreateBtn =(event) => {
        maze.checkFog(44);
        console.log("clicked create");
    }
    
    const handleEditBtn =(event) => {
        
        maze.enableEditMode();
        console.log("clicked edit");
    }
    
    const handleSubmitBtn =(event) => {
        console.log("clicked submit");
    }
    
    const handlePlayBtn =(event) => {
        console.log("clicked play");

        maze.enablePlayMode();
        
    }




    document.getElementById("create-btn").addEventListener("click", handleCreateBtn);
    document.getElementById("edit-btn").addEventListener("click", handleEditBtn);
    document.getElementById("submit-btn").addEventListener("click", handleSubmitBtn);
    document.getElementById("play-btn").addEventListener("click", handlePlayBtn);










