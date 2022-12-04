


const s = stage;
const gridUI = grid;
const grid_rep = gridUI.cells;

class GridScanner{
    constructor(grid){
        this.grid = grid;
        this.symbolic_grid = [];
        this.gridTransformer();
    }

    // This method will tranform the UI grid objects into a matrix of 1s and 0s
    gridTransformer(){
        this.symbolic_grid = [];
        for(let r=0; r<this.grid.length; r++){
            let row = [];
            for(let c=0; c<this.grid[r].length; c++){
                
                row.push(this.grid[r][c].getState())
            }
            this.symbolic_grid.push(row);
        }
    }

    // The actual scanning and checking 
    scan(){
        this.gridTransformer();
        for(let r=0; r<this.grid.length; r++){
            for(let c=0; c<this.grid[r].length; c++){

                this.checkNeighbours(r, c);
                
                let cell = this.grid[r][c];
                // if(cell.getLiveN()>0)console.log(`Neighbours ${cell.getLiveN()}, Row: ${r}, Column: ${c}`);
                // update cell status here.
            
                if(cell.getLiveN()<2 || cell.getLiveN()>3){
                    cell.setState(false);// dead cell;
                }else if(cell.getLiveN()==3){
                    cell.setState(true);   
                }
                cell.update();
            }
        }
    }

    checkNeighbours(r, c){
        let row_above = r-1;
        let row_below = r+1;
        let colum_offset_l = c-1;

        // check the row above
        for(let col=colum_offset_l; col<colum_offset_l+3; col++){
            
            if(col>=0){
                
                if(this.symbolic_grid[row_above]){
                    if (this.symbolic_grid[row_above][col] != null && this.symbolic_grid[row_above][col]) {
                        let n = this.grid[r][c].getLiveN();
                        n++;
                        this.grid[r][c].setLiveN(n);
                    }

                }

                // console.log(this.symbolic_grid[row_below], row_below, `Row: ${r}, Column: ${c}`) 
                if(this.symbolic_grid[row_below]){
                     
                    if (this.symbolic_grid[row_below][col] != null && this.symbolic_grid[row_below][col]) {
                        let n = this.grid[r][c].getLiveN();
                        n++;
                        this.grid[r][c].setLiveN(n);
                    }
                }
            }
        }

        // check the left and right position
        if(this.symbolic_grid[r][c-1]){
            let n = this.grid[r][c].getLiveN();
            n++;
            this.grid[r][c].setLiveN(n);
        }

        if(this.symbolic_grid[r][c+1]){
            let n = this.grid[r][c].getLiveN();
            n++;
            this.grid[r][c].setLiveN(n);
        }

    }

}

const scanner = new GridScanner(grid_rep);


