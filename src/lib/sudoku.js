let solutions = 0;

// Initializes a new grid, puzzle and solution
const generateSudoku = (level = 10, size = 9) => {
    let grid = [...Array(size)].map(() => Array(size).fill(0));
    let solution = [...Array(size)].map(() => Array(size).fill(0));
    let puzzle = [...Array(size)].map(() => Array(size).fill(0));

    return new Promise( (resolve, reject) => {
        let attempts = level;
        
        fillGrid(grid);
        solution = grid.map(row => row.slice());
        
        while (attempts>0){
            let row;
            let col;

            do{
                row = Math.floor(Math.random() * 9);
                col = Math.floor(Math.random() * 9);
            }while(grid[row][col]==0)

            
            grid[row][col] = 0
            solutions = 0;
            puzzle = grid.map(row => row.slice());
            solveGrid(puzzle);
            
            if (solutions != 1){
                grid[row][col] = solution[row][col];
                attempts -= 1;
            }
        }

        puzzle = grid.map(row => row.slice());

        resolve({grid, puzzle, solution})
    })
}

// Checks for incorrect number placement acording to the solution
const checkSudoku = (grid, solution) => {
    let errors = [];
    let solved = true;

    for(let i=0; i<grid.length; i++){
        for(let j=0; j<grid[i].length; j++){
            if(grid[i][j] != solution[i][j]){
                if(grid[i][j] != 0) errors.push([i, j])
                solved = false;
            }
        }
    }

    return { errors, solved };
}

// Fills a grid with numbers following the sudoku rules
const fillGrid = (grid) => {
    let row;
    let col;

    let numbers = [1,2,3,4,5,6,7,8,9]

    for(let i=0; i<81; i++){
        row = Math.floor(i/9);
        col = i%9;

        if (grid[row][col] === 0){ 
            numbers.sort(() => Math.random() - 0.5);            
            for(let number of numbers) {
                if(!grid[row].includes(number) && !checkCol(grid, col, number) && !checkSquare(grid, row, col, number)){ 
                    grid[row][col] = number;
                    if(checkGrid(grid)) return true
                    else if(fillGrid(grid)) return true
                }
            };
            break;
        } 
    }

    grid[row][col]=0
}

// Solves a grid
const solveGrid = (grid) => {
    let row;
    let col;
    
    for(let i=0; i<81; i++){
        row = Math.floor(i/9);
        col = i%9;

        if (grid[row][col] === 0){ 
            for( let number = 1; number < 10; number++){
                if(!grid[row].includes(number) && !checkCol(grid, col, number) && !checkSquare(grid, row, col, number)){
                    grid[row][col] = number;
                    if( checkGrid(grid) ){
                        solutions += 1;
                        break;
                    }else if( solveGrid(grid) ) return true;
                }
            }
            break;
        }            
    }

    grid[row][col] = 0;
}

// Checks if a column contains a value
const checkCol= (grid, col, value) => {
    for(let i=0; i<grid.length; i++){
        if( grid[i][col] === value ) return true;
    }

    return false;
}

// Checks if an square contains a value
const checkSquare = (grid, row, col, value) => {
    let square = [];    
    let rStart = row < 3 ? 0 : row < 6 ? 3 : 6
    let cStart = col < 3 ? 0 : col < 6 ? 3 : 6

    for(let i = rStart; i < rStart + 3; i++){
        square = square.concat(grid[i].slice(cStart, cStart + 3))
    }
    
    if( square.includes(value) ) return true;

    return false;
}

// Checks if a grid is fully filled
const checkGrid = (grid) => {
    for(let i=0; i<grid.length; i++){
        for(let j=0; j<grid[i].length; j++){
            if(grid[i][j] == 0) return false
        }
    }
    
    return true
}

export { generateSudoku, checkSudoku };