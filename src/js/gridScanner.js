


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
        for(let r=0; r<this.grid.length; r++){
            let row = [];
            for(let c=0; c<this.grid[0].length; c++){
                
                row.push(this.grid[r][c].getState())
            }
            this.symbolic_grid.push(row);
        }
    }

    // The actual scanning and checking 
    scan(){
        for(let r=0; r<this.grid.length; r++){
            for(let c=0; c<this.grid[0].length; c++){
                this.checkNeighbours(r, c);
                // update cell status here.
                let cell = this.grid[r][c];
                if(cell.getLiveN()<2){
                    cell.setState(0);// dead cell;
                }else if(cell.getLiveN()>=2 && cell.getLiveN()<=3){
                 
                }else if(cell.getLiveN()==3){
                    cell.setState(1);
                }
            }
        }
    }

    checkNeighbours(r, c){
        let row_above = r-1;
        let row_below = r+1;
        let colum_offset_l = c-1;

        // check the row above
        for(let col=colum_offset_l; col<colum_offset_l+3; col++){
            
            if(col>=0 && row_above>=0){
                console.log(col)
                if(this.symbolic_grid[row_above][col]){
                    let n = this.grid[r][c].getLiveN();
                    n++;
                    this.grid[r][c].setLiveN(n);
                }
            }
        }

        // check the row below
        for(let col=colum_offset_l; col<colum_offset_l+3; col++){
            if(col>0){
                if(this.symbolic_grid[row_below][col]){
                    let n = this.grid[r][c].getLiveN();
                    n++;
                    this.grid[r][c].setLiveN(n);
                }
            }
        }

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


