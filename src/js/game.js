


class GameOfLife{
    constructor(stage, grid, scanner){
        this.stage = stage;
        this.grid = grid;
        this.scanner = scanner;
        this.play_status = true;
    }

    play(){
        let start, end;
        start = Date.now();
        this.scanner.scan(); 
        this.grid.update();
        end = Date.now();

        console.log(`Time elapsed: ${(end-start) / 1000}s`);
    }
}



const gof = new GameOfLife(stage, grid, scanner)
gof.play();
createjs.Ticker.paused = true;
createjs.Ticker.interval = 200;
const playButon = document.getElementById("play");

let playing = 0;

playButon.addEventListener("click", (e)=>{
    if(playing === 0){
        createjs.Ticker.paused = false; // animation running
        playing = 1;
        playButon.innerText = 'pause';
        playButon.style.backgroundColor = 'blue';
        createjs.Ticker.addEventListener("tick", () => {
            gof.play();
        });

    }else{
        createjs.Ticker.removeAllEventListeners("tick");
        createjs.Ticker.paused = true; // animate stopped
        playing = 0;
        playButon.innerText = 'play';
        playButon.style.backgroundColor = 'greenyellow';
    }
})


const resetButton = document.getElementById('reset');

resetButton.addEventListener('click', () =>{
    window.location.reload();
    resetButton.style.backgroundColor = 'blue';
});