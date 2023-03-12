// Snake is made up of body_blocks
class Body_block{
    row: number;
    col: number;
    constructor(x:number, y:number){
        this.row=x;
        this.col=y;
    }
    update(x:number, y:number){
        grid[this.row][this.col].isDisabled = false;
        this.row = x;
        this.col = y;
        grid[this.row][this.col].isDisabled = true;;
    }

    draw():void{
        noStroke();
        let c = color(50, 55, 100);
        fill(c);
        square(this.col*GLOBAL_SIZE, this.row*GLOBAL_SIZE, GLOBAL_SIZE);
    }
}

/*
    This TypeScript code defines a Body_block class that represents a single block of the snake's body. It has two properties, row and col, which indicate the block's position on a 2D grid. The constructor initializes these properties, and the update method updates the block's position on the grid. The draw method is responsible for rendering the block on the screen as a square of a specified color.

    Overall, this class represents the behavior and appearance of a single block in the snake's body, which is an essential component of the Snake class.
*/

// Our Larry
class Snake{
    body:Body_block[] = [];
    current_direction: number[] = [0,0];
    constructor(x:number=2, y:number=2){
        let temp = new Body_block(x,y);
        this.body.push(temp);
    }

    advance(direction:number[]):void{
        this.current_direction = direction;
        let nRow = this.body[0].row+direction[0];
        if(nRow < 0) nRow = grid.length-1;
        nRow %= grid.length;
        let nCol = this.body[0].col+direction[1];
        if(nCol < 0) nCol = grid[0].length-1;
        nCol %= grid[0].length;
        

        if(grid[nRow][nCol].isDisabled == true){
           
            grid[nRow][nCol].isDisabled = false;
           
            gameOver(1);
            return;
        }
        let nBlock = this.body.splice(this.body.length-1, 1)[0];        
        this.body.splice(0,0,nBlock);
        this.body[0].update(nRow, nCol);

        if(grid[nRow][nCol].hasFood == true){
            // this.body.splice(0,0, new Body_block(nRow, nCol));
            foodEaten();
            gameOver(0);
            return;
        }

    }

    draw():void{
        for(let ele of this.body){
            ele.draw();
        }
    }
}

/*
    This TypeScript file defines a Snake class with several methods and properties. The constructor initializes a new Body_block at a specific location, and the advance method moves the snake in a specified direction by updating its position on a 2D grid. If the new position contains food, the snake grows and the game ends. If the new position contains a disabled block, the game also ends. The draw method is responsible for rendering the snake on the screen. Overall, this class represents the behavior and appearance of a snake in a 2D game environment.
*/


// Handle food being eaten event
function foodEaten():void{
    grid[food[0]][food[1]].hasFood = false;
    let i = randomRange(1, grid.length);
    let j = randomRange(1, grid[0].length)
    food = [i,j];
    // console.log(i,j, grid.length,grid[0].length);
    grid[i][j].hasFood = true;
}

/*
    This TypeScript code defines a function named foodEaten that is responsible for updating the position of food on the grid when the snake eats it. It sets the hasFood property of the current food block to false, generates a new random position for the food block using the randomRange function, and sets the hasFood property of the new food block to true.

    Overall, this function is essential for the gameplay of the Snake game as it ensures that the snake has a constant supply of food to eat, which increases the player's score and the length of the snake's body.
*/