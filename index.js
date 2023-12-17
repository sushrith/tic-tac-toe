const gameContainer = document.getElementById("game-container"); 
const reset = document.getElementById("reset");
const won = document.getElementById("won");
let hash = {};
let chance = true;
let allFilled = 0;

gameContainer.addEventListener('click',(e)=>{
const [row,col] = (e.target.dataset.index).split("-").map(e=>parseInt(e));
console.log(row,col);
if(e.target.dataset.index){
    const key = e.target.dataset.index;
    if(!hash[key]){
        if(chance){
        hash[key] = 'X';
        e.target.classList.add("cell-withX");
        }else{
            hash[key] = 'O';
        e.target.classList.add("cell-withO");
        }
        chance = !chance;
        allFilled++;
        let result = checkWin();
        if(allFilled==9 || result.includes("Win")){
            document.getElementById("won").innerHTML = result;
            gameContainer.style.pointerEvents = "none";
        }    
    }
}
});

reset.addEventListener('click',(e)=>{
    const cells = document.querySelectorAll('.cell');
    cells.forEach((e)=>{
        if(e.classList.contains('cell-withX')){
            e.classList.remove("cell-withX");
        }else{
            e.classList.remove("cell-withO");
        }
    });
    allFilled =0;
    chance = true;
    hash={};
    gameContainer.style.pointerEvents = "auto";
    document.getElementById("won").innerHTML = '';

})



function checkWin(){
    //row
    for(let i=0;i<3;i++){
        let set = new Set();  
        let player = "";  
        for(let j =0;j<3;j++){
            let key = `${i}-${j}`;
            set.add(hash[key]);
            player = hash[key];
        }
        if(set.size === 1 && player){
            return `Player ${player} Win`
        }
    }
    //col
    for(let j=0;j<3;j++){
        let set = new Set();  
        let player = "";  
        for(let i =0;i<3;i++){
            let key = `${i}-${j}`;
            set.add(hash[key]);
            player = hash[key];
        }
        if(set.size === 1 && player){
            return `Player ${player} Win`
        }
    }

    //diag
    let i =0;
    let j =0;
    let set = new Set();
    let player = "";  
    while(i<3 && j<3){
        let key = `${i}-${j}`;
        set.add(hash[key]);
        player = hash[key];
        i++;
        j++;
    }
    if(set.size === 1 && player){
        return `Player ${player} Win`
    }
    
    //anti diag
     i =0;
     j =2;
     set = new Set();
     player = "";  
    while(i<3 && j>=0){
        let key = `${i}-${j}`;
        set.add(hash[key]);
        player = hash[key];
        i++;
        j--;
    }
    if(set.size === 1 && player){
        return `Player ${player} Win`
    }

    return "Match draw";
}