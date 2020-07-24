//select options button
const select=document.querySelector(".select")

//buttons on the mainpage
const compbtn=document.querySelector(".comp")
const friendbtn=document.querySelector(".friend")
//symbols
const xbtn=document.querySelector(".x")
const obtn=document.querySelector(".o")
//depths that is used in the minimax tree
const zerobtn=document.querySelector(".zero")
const onebtn=document.querySelector(".one")
const twobtn=document.querySelector(".two")
const threebtn=document.querySelector(".three")
const fourbtn=document.querySelector(".four")
//grid size buttons ranging from 3 to 5
const grid3btn=document.querySelector(".grid3")
const grid4btn=document.querySelector(".grid4")
const grid5btn=document.querySelector(".grid5")
//play button
const playbtn=document.querySelector(".play")

//game over element
const gamebtn=document.querySelector(".gameover")
//player object that consists of man,ai and friend data with o's and x's
const player=new Object
//variables to store the depths,opponent and the grid size
let opponent;
let depth=-1;
let grid;

obtn.addEventListener("click",function(){
    player.man="O";
    player.comp="X";
    player.friend="X";
    switchactive(obtn,xbtn);
});

xbtn.addEventListener("click",function(){
    player.man="X";
    player.comp='O';
    player.friend='O';
    switchactive(xbtn,obtn);
});

compbtn.addEventListener("click",function(){
    opponent='comp';
    switchactive(compbtn,friendbtn);
});

friendbtn.addEventListener("click",function(){
    opponent='friend';
    switchactive(friendbtn,compbtn);
});

function switchactive(on,off){
    on.classList.add("active");
    off.classList.remove("active");
}

zerobtn.addEventListener("click",function(){
    depth=0;
    zerobtn.classList.add("active");
    onebtn.classList.remove("active");
    twobtn.classList.remove("active");
    threebtn.classList.remove("active");
    fourbtn.classList.remove("active");
});

onebtn.addEventListener("click",function(){
    depth=1;
    onebtn.classList.add("active");
    zerobtn.classList.remove("active");
    twobtn.classList.remove("active");
    threebtn.classList.remove("active");
    fourbtn.classList.remove("active");
});

twobtn.addEventListener("click",function(){
    depth=2;
    twobtn.classList.add("active");
    onebtn.classList.remove("active");
    zerobtn.classList.remove("active");
    threebtn.classList.remove("active");
    fourbtn.classList.remove("active");
});

threebtn.addEventListener("click",function(){
    depth=3;
    threebtn.classList.add("active");
    onebtn.classList.remove("active");
    twobtn.classList.remove("active");
    zerobtn.classList.remove("active");
    fourbtn.classList.remove("active");
});

fourbtn.addEventListener("click",function(){
    depth=4;
    fourbtn.classList.add("active");
    onebtn.classList.remove("active");
    twobtn.classList.remove("active");
    threebtn.classList.remove("active");
    zerobtn.classList.remove("active");
});

grid3btn.addEventListener("click",function(){
    grid=3;
    grid3btn.classList.add("active");
    grid4btn.classList.remove('active');
    grid5btn.classList.remove("active");
});

grid4btn.addEventListener("click",function(){
    grid=4;
    grid4btn.classList.add("active");
    grid3btn.classList.remove('active');
    grid5btn.classList.remove("active");
});

grid5btn.addEventListener("click",function(){
    grid=5;
    grid5btn.classList.add("active");
    grid4btn.classList.remove('active');
    grid3btn.classList.remove("active");
});

playbtn.addEventListener("click",function(){
    if(!opponent)
    { 
        compbtn.style.backgroundColor="red";
        friendbtn.style.backgroundColor="red"; 
        return;
    }
    if(!player.man){
        obtn.style.backgroundColor="red";
        xbtn.style.backgroundColor="red"; 
        return;
    }
    if(depth==-1){
        zerobtn.style.backgroundColor="red";
        onebtn.style.backgroundColor="red";
        twobtn.style.backgroundColor="red";
        threebtn.style.backgroundColor="red";
        fourbtn.style.backgroundColor="red";
        return;

    }
    if(!grid){
        grid3btn.style.backgroundColor="red";
        grid4btn.style.backgroundColor="red";
        grid5btn.style.backgroundColor="red";
        return;

    }
    
    board(player,opponent,depth,grid);
    select.classList.add("hide");

});


