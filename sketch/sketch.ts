// GLOBAL Ingridients
let numberOfShapesControl: p5.Element;
let slider:any;
let GLOBAL_SIZE = 30;
var grid: Box[][];
let wid:number, hei:number;
let canv:p5.Element;
let larry:Snake;
let TIME = 300;
let STOP:boolean = false;
let inter:any;
let food:number[] = [];
let SCORE = 0, HIGHSCORE=0;


function setup(): void {
    console.log("Setup initialized - P5 is running");
    frameRate(60);
    
    wid = floor((windowWidth/1.1)/GLOBAL_SIZE)*GLOBAL_SIZE;
    hei = floor((windowHeight/1.1)/GLOBAL_SIZE)*GLOBAL_SIZE;
    hei = min(hei, 700);
    canv = createCanvas(wid, hei) //createCanvas() is a built-in function that creates a canvas element and appends it to the HTML document. The canvas element is used to draw graphics in the browser window.
    canv.parent("canv_holder") //The next line, canv.parent("canv_holder"), sets the parent of the canvas element to be the HTML element with the ID canv_holder. This ensures that the canvas is displayed in the correct location on the webpage.

    slider = createSlider(1,5,3,1) //For slider
    slider.parent("left")
    let butt = createButton("RESET");
    butt.parent("lower");
    butt.class("button1")
    butt.mouseClicked(()=>{
        clearInterval(inter);
        reset();
    });
    
    //Initialization
    reset();
    slider.input(()=>{
        keepAdvancing(larry.current_direction);
    });
    
}

/*
    This TypeScript code defines a setup function that is responsible for initializing the P5.js environment for the Snake game. It sets the frame rate to 60, calculates the width and height of the canvas based on the size of the window, creates a canvas element with the calculated dimensions, and sets it as a child of the "canv_holder" element in the HTML document.
    The function also creates a slider element and a reset button element with specified values and styling, sets up an event listener for the slider to update the snake's direction when it changes, and sets up an event listener for the reset button to reset the game.
    Overall, this function is essential for initializing the game environment and setting up the user interface for the game.
*/

// Returns the entire setup(NOT the function above) to a Starting state
function reset():void{
    clearInterval(inter);
    setScore("SCOREBOARD","0");
    grid = []
    for(let i=0;i<hei/GLOBAL_SIZE;i++){
        let brid:Box[] = [];
        for(let j=0;j<wid/GLOBAL_SIZE;j++){
            let temp = new Box(i,j);
            temp.draw();
            brid.push(temp);
        }
        grid.push(brid);
    }
    //Snek
    larry = new Snake();
    

    //Cherry picked stuff
    SCORE = 0;
    keyCount = 0;
    BLOCKS = [];
    let _points = grid.length>20?30:20;
    let _len = floor((5/41)*grid[0].length);
    generateBlocks(_points,5);
    generateFood();
}

/*
    This TypeScript code defines a reset() function that is used to reset the game board when the "RESET" button is clicked.

    The function clears the interval (inter) that is used to advance the snake's movement. It then sets the scoreboard to display a score of 0 using the setScore() function.

    The grid array is then reset by creating a new 2D array of Box objects that correspond to the size of the canvas. Each Box object is created and added to the grid array, and its draw() method is called to display it on the canvas.

    A new instance of the Snake class is created and assigned to the larry variable.

    Several variables are reset, including the SCORE (score), keyCount (number of keys pressed), and BLOCKS (array of blocks that the snake cannot pass through). The generateBlocks() function is called to generate a set number of blocks based on the size of the grid, and the generateFood() function is called to randomly place food on the game board.
*/

//Canvas Drawing
let keyCount = 0;
let x: number=0
let BLOCKS:number[][] = []
function draw(): void{
    
    // Set the background color to a light gray
    background(240);
    
    larry.draw();
    if(food.length != 0){
        push()
        noStroke();
        // Set the fill color to red
        let c = color(212, 0, 0);
        fill(c);
        // rectMode(CENTER);
        square(food[1]*GLOBAL_SIZE, food[0]*GLOBAL_SIZE, GLOBAL_SIZE);
        pop()
    }

    if(larry.body.length >= grid.length*grid[0].length - BLOCKS.length-1){
        noLoop();
        alert("You Won, Board is full");
        reset();
        return;
    }
    for(let ele of BLOCKS){
        push()
        noStroke();
        // Set the fill color to brown
        let c = color(92, 64, 51);
        fill(c);
        // rectMode(CENTER);
        square(ele[1]*GLOBAL_SIZE, ele[0]*GLOBAL_SIZE, GLOBAL_SIZE);
        pop()
    }
    
}



//Handy function to give snake a direction to advance to
function keepAdvancing(direction:any):void{
    if(direction[0] == 0 && direction[1] == 0){
        return;
    }
    let val:any = slider.value();
    clearInterval(inter);
    inter = setInterval(()=>{
        larry.advance(direction);
    }, TIME/(val+1));
}

/*
    This TypeScript code defines a function called keepAdvancing, which takes in one parameter called direction of type any (i.e., any data type can be passed in).

    Inside the function, there is an if statement that checks if the direction parameter is [0, 0] (i.e., no movement). If so, the function immediately returns without doing anything.

    If the direction parameter is not [0, 0], the function clears any previous intervals (if any) using the clearInterval function, and sets a new interval using the setInterval function. This interval runs the larry.advance function, which advances the "Larry" character in the specified direction. The amount of time between each advance is determined by the val variable, which is calculated by taking the value of a slider element in the web page and adding 1. The TIME variable is a constant value defined elsewhere in the code.

    In summary, this function is used to repeatedly advance the "Larry" character in the specified direction, with the speed of movement controlled by a slider element in the web page.
*/

// As the name suggests
function generateFood(i:number=0, j:number=0):void{
    if(i!=0 && j != 0){
        food = [i,j];
        grid[i][j].hasFood = true;
        return;
    }
    let avai:number[][] = [];
    for(let x=3;x<grid.length;x+=floor(randomRange(1,4))){
        for(let y=0;y<grid[0].length;y+=floor(randomRange(2,6))){
            if(grid[x][y].isDisabled == false){
                avai.push([x,y]);
            }
        }
    }
    let ra = floor(randomRange(0, avai.length));
    
    let rand = avai[ra];
    // console.log(avai);
    food = [rand[0], rand[1]]
    grid[food[0]][food[1]].hasFood = true;
    
}

/*
    This is a TypeScript function named generateFood that generates the food item for the snake game. It takes two optional parameters, i and j, that represent the row and column index of the grid where the food should be placed. If these parameters are not provided, the function randomly selects a valid location in the grid.

    The function starts by checking if the i and j parameters are provided. If so, it sets the food location to that position in the grid and marks that grid cell as having food by setting the hasFood property of that cell to true. Then the function returns and the food item will be drawn on the screen in the draw function.

    If i and j are not provided, the function creates an array of available grid cells where the food item can be placed. It does this by looping through the grid, starting at row index 3 and incrementing by a random value between 1 and 4, and starting at column index 0 and incrementing by a random value between 2 and 6. It then checks if the current grid cell is not disabled, meaning it's not part of the snake's body or a block, and adds it to the available locations array.

    Next, the function generates a random integer index between 0 and the length of the available locations array, and selects a random available location from the array.

    Finally, the function sets the food location to the randomly selected position in the grid, marks that grid cell as having food, and returns. The food item will then be drawn on the screen in the draw function.

*/

// IDK why is it here
function windowResized() {
    // resizeCanvas(windowWidth/2, windowHeight/2);
}

// Handy funtion for getting a random number between min(inclusive) and max(exclusive)
function randomRange(min:number, max:number): number {
    return floor(Math.random() * (max - min) + min);
}

// Some juicy boi, Makes the snake follow a path, which in fact is shortest path to the food
function followPath_altered(path:number[][], idx:number=0):void{
    if(path.length == 0){
        console.log("Nothing to travel to")
        return;
    }
    clearInterval(inter);
    let val:any = slider.value();
    inter = setInterval(()=>{
        let now = path[idx];
        now[0] -= larry.body[0].row;
        now[1] -= larry.body[0].col;
        larry.advance(now);
        // console.log(idx);
        idx++;
        if(idx >= path.length){
            clearInterval(inter);
        }
    }, TIME/(val+1));
    
}

/*
    This function is used to make the snake move along a given path. It takes in two arguments, the path (an array of coordinate pairs) that the snake needs to follow and the starting index (defaulted to 0) of the path array.

    The function first checks if the path array is not empty, and if it is, it returns and logs a message to the console.

    Then it clears the current interval (if any) and sets a new interval to repeatedly execute a function until the end of the path is reached. The time delay between each execution is calculated based on the value of the slider.

    In each execution of the interval function, the snake is made to advance towards the next coordinate in the path by subtracting the current head position of the snake from the next coordinate in the path, and passing the resulting direction vector to the advance() method of the larry object (assuming larry is the snake object).

    The index idx is incremented by 1 after each execution of the interval function, and when the index reaches the end of the path array, the interval is cleared.
*/

// Updates position of the food and recalibrates the path for the snake for new food location
// Massive improvements can be made here

function updateFood(x:number, y:number):void{
    clearInterval(inter);
    grid[food[0]][food[1]].hasFood = false;
    food[0] = x;
    food[1] = y;
    grid[x][y].hasFood = true;
    
    let path_gen = BFS();
    if(path_gen === undefined){
        return;
    }
    followPath_altered(path_gen, 0);
}

/*
    This function updates the position of the food on the game board. It takes in the new x and y coordinates of the food and updates the food array accordingly. It also sets the hasFood property of the old and new grid cells to false and true respectively.

    Then it generates a new path from the head of the snake to the new food position using the BFS function. If a path is found, it calls the followPath_altered function to make the snake move towards the new food position. If a path is not found, the function simply returns without making any changes to the snake's movement.
*/

//Controls the food
//65 68 87 83
function keyPressed(): void {
    keyCount++;
    let fx=food[0], fy=food[1];
    if (keyCode === 65) {
        //console.log("LEFT")
        fy = food[1]-1;
        fy = (fy<0?grid[0].length-1:fy);
        if(grid[fx][fy].isDisabled == false){
            updateFood(fx,fy);
        }
        
    } else if (keyCode === 68) {
        // console.log("RIGHT")
        fy = food[1]+1;
        fy = (fy>=grid[0].length?0:fy);
        if(grid[fx][fy].isDisabled == false){
            updateFood(fx,fy);
        }
    } else if (keyCode === 87) {
        // console.log("UP")
        fx = food[0]-1;
        fx = (fx<0?grid.length-1:fx);
        if(grid[fx][fy].isDisabled == false){
            updateFood(fx,fy);
        }
    } else if (keyCode === 83) {
        // console.log("DOWN")
        fx = food[0]+1;
        fx = (fx>=grid.length-1?0:fx);
        if(grid[fx][fy].isDisabled == false){
            updateFood(fx,fy);
        }
    }
    //Updating scores
    if(keyCount >= 10){
        keyCount = 0;
        let val = slider.value();
        SCORE += floor(pow(2, val)*10/8.2);
        setScore("SCOREBOARD",SCORE.toString());
        if(SCORE > HIGHSCORE){
            HIGHSCORE = SCORE;
            // setScore("HIGHSCORE", HIGHSCORE.toString());
            document.getElementById("HIGHSCORE").innerHTML = "High Score: "+HIGHSCORE;
        }
        larry.body.push(new Body_block(larry.body[larry.body.length-1].row, larry.body[larry.body.length-1].col))
    }
}

/*
    This code block is a part of a larger codebase for a game. It increases the size of the snake and updates the score when the player eats food.

    When the player eats food, the keyCount variable keeps track of how many times the snake has eaten. Once keyCount reaches 10, the size of the snake is increased by adding a new Body_block object to the end of the larry.body array. The Body_block object is created at the same position as the last block of the current snake body, effectively increasing the length of the snake by one block.

    The score is updated based on a formula that takes into account the current value of the slider element on the game page. The slider value is raised to the power of 2 and multiplied by 10/8.2, and the result is then rounded down to the nearest integer using the floor function. The resulting value is added to the SCORE variable, which keeps track of the player's current score.

    If the updated SCORE value is greater than the HIGHSCORE value, then the HIGHSCORE value is updated with the new SCORE value. The updated HIGHSCORE value is displayed on the game page by updating the text content of an HTML element with the ID "HIGHSCORE".
*/


let swears = ["You suck at this", "Aww Crap!", "Try harder!", "Better Luck next time...", "Sedlyf","A two year old plays better than you"]
// Handle Game over incident
function gameOver(x:number):void{
    clearInterval(inter);
    if(x == 0)
        alert(`${swears[floor(randomRange(0, swears.length))]}\nYour Score: ${SCORE}`);
    else 
        alert(`Yayy you WON!! He can't warp through borders stupid snake huh..\nYour Score: ${SCORE}`);
    reset();
}
// Handy funtion to update HTML elements
function setScore(od: string, x: string){
    document.getElementById(od).innerHTML = "SCORE: "+x;
}
