function BFS():number[][]{   
    let q:number[][] = [];
    // let parents: {[k: string]: any} = {};
    let parents:number[][][] = [];
    let visited:boolean[][] = [];
    let FOUND = false;

    //Initialize parents to nodes and visited nodes to defaults
    for(let i=0;i<grid.length;i++){
        let tp = [];
        let tpp = [];
        for(let j=0;j<grid[0].length;j++){
            tp.push(false);
            tpp.push([-1,-1]);
        }
        visited.push(tp);
        parents.push(tpp);
    }

    //Handy function to check for valid nodes
    let isValid = (i:number, j:number) => {
        if(i >= 0 && j >= 0 && i < grid.length && j < grid[0].length){
            if(grid[i][j].isDisabled == false && visited[i][j] == false){
                return true;
            }
        }
        return false;
    }
    
    //Oh my BFS
    q.push([larry.body[0].row,larry.body[0].col]);
    while(q.length != 0){
        
        let hold = q[0];
    
        if(food[0] == hold[0] && food[1] == hold[1]){
            
            FOUND = true;
            break;
        }
        q.shift();
        if(visited[hold[0]][hold[1]] == false){
            visited[hold[0]][hold[1]] = true;
            
            let top    = [hold[0]-1, hold[1]];
            let bottom = [hold[0]+1, hold[1]];
            let left   = [hold[0], hold[1]-1];
            let right  = [hold[0], hold[1]+1];
            
            if(isValid(top[0], top[1])){
                parents[top[0]][top[1]] = hold;
                q.push([top[0],top[1]])
            }
            if(isValid(right[0], right[1])){
                parents[right[0]][right[1]] = hold;
                q.push([right[0],right[1]])
            }
            if(isValid(bottom[0], bottom[1])){
                parents[bottom[0]][bottom[1]] = hold;
                q.push([bottom[0],bottom[1]])
            }
            if(isValid(left[0], left[1])){
                parents[left[0]][left[1]] = hold;
                q.push([left[0],left[1]])
            }
        }

    }

    if(FOUND){
        let x = food[0];
        let y = food[1];
        let path = [[x,y]];
        let test_c = 0;
        while(true){
            let tx = parents[x][y][0];
            let ty = parents[x][y][1];
            x = tx; y = ty;
            if(parents[x][y][0] == -1 && parents[x][y][1] == -1){
                gameOver(0);
                return;
            }
            path.push([x,y])

            if(parents[x][y][0] == larry.body[0].row && parents[x][y][1] == larry.body[0].col){
                // console.log(x,y);
                break;
            }

            //SUPER UGLY ERROR, Still needs fixing
            test_c++;
            if(test_c > 200){
                console.log("INF");
                console.log(parents);
                console.log(food);
                console.log(larry.body[0]);
                console.log(path);
                alert("SOMETHING_WENT_WRONG");
                reset();
                break;
            }
        }
        path.reverse()
        return path;
    }else{
        console.log("NPF")
        gameOver(1);
        return [];
    }
}


/*
    This code is implementing a Breadth-First Search (BFS) algorithm to find the shortest path from the head of a snake to a food item in a grid.

    Here is a high-level overview of the code:

    The BFS function is defined and takes no arguments. It returns a 2D array representing the path from the snake's head to the food item.
    Several arrays are initialized to hold information about the search. q is the queue used in the BFS, parents is a 2D array that will be used to track the parent of each node in the search tree, and visited is a 2D array that keeps track of whether each node has been visited during the search.
    A function isValid is defined that checks whether a given node is a valid candidate for the search (i.e., it is inside the grid and is not disabled).
    The BFS algorithm is executed using a while loop that continues until the queue q is empty or the food item has been found. The algorithm works by examining the node at the front of the queue and then exploring all of its neighbors. If a neighbor is a valid candidate for the search, it is added to the queue and its parent is recorded in the parents array.
    If the food item is found, the parents array is used to trace the path from the food item back to the snake's head. This path is returned as a 2D array.
    If the food item is not found, an empty array is returned.
    Overall, this code is used to determine the shortest path from the snake's head to the food item in order to move the snake towards the food and avoid obstacles.
*/