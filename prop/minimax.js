
function board(player,opponent,depth,grid){
    
    //Select a canvas
    var canvas=document.getElementById("mainpage");
    var ctx=canvas.getContext("2d");
    //game variables(board)
    var board=[]
    var col=grid;
    var row=grid;
    var space_size=600/grid;
    // store depth
    var given_depth=depth;
    //by default store the first playre to play is the human
    var curplayer=player.man;
    // store moves
    let moves=new Array(grid*grid);
    //to check if its the game end
    var over=false;
    //all the possibilies of wincases into a 2d array
    var wincases;
    if(grid==3){
        wincases=[
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
    }
    else if(grid==4){
        wincases=[
            [0,1,2,3],
            [4,5,6,7],
            [8,9,10,11],
            [12,13,14,15],
            [0,4,8,12],
            [1,5,9,13],
            [2,6,10,14],
            [3,7,11,15],
            [0,5,10,15],
            [3,6,9,12]
        ];
    }
    else if(grid==5){
        wincases=[
            [0,1,2,3,4],
            [5,6,7,8,9],
            [10,11,12,13,14],
            [15,16,17,18,19],
            [20,21,22,23,24],
            [0,5,10,15,20],
            [1,6,11,16,21],
            [2,7,12,17,22],
            [3,8,13,18,23],
            [4,9,14,19,24],
            [0,6,12,18,24],
            [4,8,12,16,20]
        ];
    }
    //draw a board of size (grid*grid)
    function drawboard(){
        let id=0;
        for(let i=0;i<row;i++)
        {
            board[i]=[];
            for(let j=0;j<col;j++)
                {
                    board[i][j]=id;
                    id++;
    
                    //draw the blocks
                    ctx.strokeStyle="#fff";
                    ctx.strokeRect(j*space_size,i*space_size,space_size,space_size);
                }
        }
    }
    drawboard();
    
    
    //on players click(considering that the players turn is always the first)
    canvas.addEventListener("click",function(event){
        
        //if it is tie then gameover and then return 
        if(over)
        {
        return;
        }
        // get the x and y position relative to the canvas
      
        let x=event.clientX-canvas.getBoundingClientRect().x;
        let y=event.clientY-canvas.getBoundingClientRect().y;
        //calculate i and j values of the space that is selected
       
        let i=Math.floor(y/space_size);
        let j=Math.floor(x/space_size);
        //get the id of the space
        let id=board[i][j];
        
        //prevent the player to play the same space twice
        if(moves[id])return;
        //store the players move
        moves[id]=curplayer;
        //draw the symbol on the board
        drawsymbol(curplayer,i,j);
        
        //check if its a win
        if(iswinning(moves,curplayer)){
            isgameover(curplayer);
            over=true;
            return; 
        }
        //check if it is a tie
        if(isfull(moves)){
            isgameover("tie");
            over=true;
            return;
        }
                
        if(opponent=="comp"){
            let id;
            //get the bestmove among all the empty spaces that are present
            id=bestmove(moves,given_depth);
            
            //fill the space with player.comp
            moves[id]=player.comp;
            //get the i and j coordinates of the space
            let space=getij(id);
            drawsymbol(player.comp,space.i,space.j);
            if(iswinning(moves,player.comp)){
                isgameover(player.comp);
                over=true;
                return;
            }
            if(isfull(moves)){
                isgameover("tie");
                over=true;
                return;
            }
        }
        else{
            //turn for other player in case of man vs friend
            curplayer=curplayer==player.friend? player.man:player.friend;
        }
       });
    var k;
    // this function calculates the best move out of all the spaces
    // available for computer's turn
    function bestmove(moves,givend)
    {
        let bestval=-Infinity;
        //these arrays are for storing the best values and their indices
        let bestarray=[];
        let bestindex=[];
        
        for(let i=0;i<moves.length;i++)
        {   if(!moves[i]){
            moves[i]=player.comp;
            //call the recursive minimax function
            let moveval=minimax(moves,false,0,-Infinity,Infinity,givend);
            moves[i]=undefined;
            //select the best value out of all the intermediatory values
            if(moveval>=bestval)
            {   
                bestval=moveval;
                bestarray.push(bestval);
                bestindex.push(i);
            }

        }
        }
        //random function to call a random space out of all possible equal values scores
        let k=maximum(bestarray);
        let best_moves=[];
        for(let i=0;i<bestarray.length;i++)
        {
            if(k==bestarray[i])
            {
                best_moves.push(bestindex[i]);
            }
        }
        return choose(best_moves);
    }
    //minimax function
    function minimax(moves,ismax,d,alpha,beta,given_d)
    {    
        let score=eval(moves);
        //base case when computer wins
       if(iswinning(moves,player.comp)){
           return score-depth;
            
        }
        //base case when human wins
        if(iswinning(moves,player.man)){
           return score+depth;
        }
        //if not win but given depth value is equal to the recursive depth
        if(given_d===d){
            return score;
        }
        //when its a tie
        if(isfull(moves)===true){
            return 0;
        }
        if(ismax)//Maximizer
        { 
            bestscore=-Infinity;
            for(let i=0;i<moves.length;i++)
            {
                if(!moves[i])
                {
                    moves[i]=player.comp;
                    bestscore=Math.max(bestscore,minimax(moves,false,d+1,alpha,beta,given_d));
                    moves[i]=undefined;
                    alpha=Math.max(bestscore,alpha);
                    if(beta<=alpha)
                    {
                        break;
                    }

                }
            }
            return bestscore;
        }
        if(!ismax){
            bestscore=Infinity;
            for(let i=0;i<moves.length;i++)
            {
                if(!moves[i])
                {
                    moves[i]=player.man;
                    bestscore=Math.min(bestscore,minimax(moves,true,d+1,alpha,beta,given_d));
                    moves[i]=undefined;
                    beta=Math.min(bestscore,beta);
                    if(beta<=alpha)
                    {
                        break;
                    }

                }
            }
            return bestscore;
        }
    }
    //find the maximum value in the array
    function maximum(arr){
        let m=arr[0];
        for(let i=0;i<arr.length;i++)
        {
            if(arr[i]>m)
            {
                m=arr[i];
            }
        }
        return m;
    }
    //random value generating function
    function choose(choices) {
        var index = Math.floor(Math.random() * choices.length);
        return choices[index];
      }
    //checking if the player is a win
    function iswinning(moves,player){    
        if(grid==3){
        for(let i = 0; i < wincases.length; i++){
           if((moves[wincases[i][0]]==player)&&(moves[wincases[i][1]]==player)&&(moves[wincases[i][2]]==player))   
                {
                    return true;
                }
     }
        return false;
    }
    else if(grid==4)
    { 
        for(let i = 0; i < wincases.length; i++){
            if((moves[wincases[i][0]]==player)&&(moves[wincases[i][1]]==player)&&(moves[wincases[i][2]]==player)&&(moves[wincases[i][3]]==player))   
                 {
                     return true;
                 }
      }
         return false;
        
    }
    else if(grid==5)
    {
        for(let i = 0; i < wincases.length; i++){
            if((moves[wincases[i][0]]==player)&&(moves[wincases[i][1]]==player)&&(moves[wincases[i][2]]==player)&&(moves[wincases[i][3]]==player)&&(moves[wincases[i][4]])==player)   
                 {
                     return true;
                 }
      }
         return false;
    }
    }
    //heuristic function 
    function eval(moves)
    {   let score=0;
        for(let i=0;i<wincases.length;i++)
        {   let c=0;
            let e=0;
            for(let j=0;j<grid;j++)
            {
                if(moves[wincases[i][j]]==moves[wincases[i][0]])
                {
                    c++;
                }
                else if(moves[wincases[i][j]]==undefined)
                {
                    e++;
                }
            }
            if(grid-c==e)
            { 
             if(moves[wincases[i][0]]==player.comp)
                {
                score+=Math.pow(10,c-1);
                }
                else if(moves[wincases[i][0]]==player.man)
                {
                    score+=(-Math.pow(10,c-1));
                }
            }
            else{
                score+=0;
            }
            
        }
        return score;
       
    }
    //get the i and j value of the space
    function getij(id){
        for(let i=0;i<grid;i++)
        {
            for(let j=0;j<grid;j++)
            {
                if(board[i][j]==id)
                {
                    return {i:i,j:j};
                }
            }
        }
    }
    //function to check if its a tie
    function isfull(moves){
        for(let i=0;i<moves.length;i++)
        {
            if(!moves[i])
            return false;
        }
        return true;
    }
    //draw the symbol either x or o

    function drawsymbol(p,i,j)
    {
        let k=space_size/2;
        //for drawing symbol O
        if(p=="O")
        {
            ctx.beginPath();
            ctx.arc(j*k*2+k,i*k*2+k,k-40,0,2*Math.PI);
            ctx.lineWidth = 10;
            ctx.strokeStyle = "white";
            ctx.stroke();
            ctx.closePath();
        }
        //for drawing symbol X
        if(p=="X"){
            ctx.beginPath();
            ctx.moveTo(j*k*2+40,i*k*2+40);
            ctx.lineTo((j+1)*k*2-40,(i+1)*k*2-40);
            ctx.moveTo((j+1)*k*2-40,(i)*k*2+40);
            ctx.lineTo(j*k*2+40,(i+1)*k*2-40);
            ctx.lineWidth = 10;
            ctx.lineCap = "round";
            ctx.strokeStyle = "white";
            ctx.stroke();
            ctx.closePath();
        }

    }
    // this function is executed when there's either a win or tie i.e.,the game is over
    function isgameover(p)
    {  
        let l=0;
        let msg=p=="tie"? "NO winner, its a tie!!":"The winner is";
        let k;
        if(p=='X')
        {
            k='X';
        }
        else if(p=='O')
        {
            k='O';
        }
        else{
            k='';
        }
        //show the new game button
        //newgame.classList.remove("hide");
        document.getElementById("heading").innerHTML=msg +" "+ k;
        timeFunction();
    } 
    function timeFunction() {
        setTimeout(function(){location.reload()}, 5000);
    }
};



/*
function showGameOver(player){
    let message = player == "tie" ? "Oops No Winner" : "The Winner is";
    let imgSrc = `img/${player}.png`;

    gameOverElement.innerHTML = `
        <h1>${message}</1>
        <img class="winner-img" src=${imgSrc} </img>
        <div class="play" onclick="location.reload()">Play Again!</div>
    `;

    gameOverElement.classList.remove("hide");
}*/