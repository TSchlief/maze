const MAZE_HEIGHT = 15;
const MAZE_WIDTH = 15;
const CELL_COUNT = MAZE_HEIGHT * MAZE_WIDTH;

const mazeStyle =`
    grid-template-columns: repeat(${MAZE_HEIGHT}, 2.5vw);
    grid-template-rows: repeat(${MAZE_WIDTH}, 2.5vw)`;

document.getElementById("maze").style.cssText = mazeStyle;

const handleClick = (event) => {
    let iswall;
    if(event.target.getAttribute("iswall") === "true"){
        iswall = "false";
    }
    else{
        iswall = "true";
    }
    event.target.setAttribute("isWall", iswall);
    
    console.log("clicked",event.target.getAttribute("cellNumber"));
}

let cellsHtml = [];
for(let i = 0; i < CELL_COUNT; i++){
    cellsHtml += `
        <div iswall="true" cellNumber='${i}' class="maze-cell" id="maze-cell-${i}"></div>
    ` 
}

document.getElementById("maze").innerHTML = cellsHtml;

for(let i = 0; i < CELL_COUNT; i++){
    document.getElementById(`maze-cell-${i}`).addEventListener("click", handleClick);
}

