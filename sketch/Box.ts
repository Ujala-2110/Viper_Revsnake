class Box{
    row:number;
    col:number;
    hasFood:boolean = false;
    isDisabled:boolean = false;
    constructor(i:number, j:number){
        this.row = i;
        this.col = j;
    }
    draw():void{
        fill(100);
        stroke(5);
        square(this.col*GLOBAL_SIZE, this.row*GLOBAL_SIZE, GLOBAL_SIZE); 
    }
}

/*
    This code defines a class Box that represents a single box or cell in a game. Each Box object has a row and col property that specify its position in the game grid. It also has a hasFood property that indicates whether there is food in the box or not, and an isDisabled property that indicates whether the box is disabled or not.

    The constructor initializes the row and col properties based on the arguments passed to it. The draw() method is used to draw the box on the canvas using the fill() and square() functions of the p5.js library. The position of the box is calculated based on its row and col properties, and the size of the box is determined by the GLOBAL_SIZE constant.p

*/