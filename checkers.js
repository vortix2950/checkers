// checkers.js

/** The state of the game */
var state = {
  action: 'idle',
  over: false,
  turn: 'b',
  black:0,
  white:0,
  board: [
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,'b','w',null,null,null],
    [null,null,null,'w','b',null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
  ],
  //captures: {w: 0, b: 0}
}

var ctx;


function checkForVictory() {
  if(state.black+state.white>=64) {
    var victory=document.getElementById("victory_id");

    state.over = true;
    if(state.black>state.white){victory.innerHTML="---  Black wins!";return 'black wins'; }
    else{victory.innerHTML="---  White wins!";return "white wins";}

    return 'black wins';
  }

  return null;
}

/** @function nextTurn()
  * Starts the next turn by changing the
  * turn property of state.
  */
function nextTurn() {
  var id=document.getElementById('player_turn');

  if(state.turn === 'b') {state.turn = 'w'; id.innerHTML="  white's turn";}
  else {state.turn = 'b'; id.innerHTML="  black's turn";}
}

/** @function renderChecker
  * Renders a checker at the specified position
  */
function renderPiece(piece,x,y){
  ctx.beginPath();
  if(piece === 'w') {
    ctx.fillStyle = '#b2a87c';
    state.board[y][x]="w";

  } else if(piece === 'b'){

    ctx.fillStyle = '#000000';
    state.board[y][x]='b';
  }


  ctx.arc(x*100+50, y*100+50, 40, 0, Math.PI * 2);
  ctx.fill();

}
function countPieces(){
  state.black=0;
  state.white=0;
  for(var y = 0; y < 8; y++) {
    for(var x = 0; x < 8; x++) {
      if(state.board[y][x]==='b')state.black++;
      if(state.board[y][x]==='w')state.white++;
   var white=document.getElementById("white_count");
   var black=document.getElementById("black_count");
   white.innerHTML='White : ' + state.white+"  ";
   black.innerHTML='black : ' + state.black+"  ";

    }
  }
}

/** @function renderSquare
  * Renders a single square on the game board
  * as well as any checkers on it.
  */
function renderSquare(x,y) {
  if((x + y) % 2 == 1) {
    ctx.fillStyle = '#675';
    ctx.fillRect(x*100, y*100, 100, 100);

  }
  else{ctx.fillStyle = '#273872';
  ctx.fillRect(x*100, y*100, 100, 100);}
  if(state.board[y][x]) {
    renderPiece(state.board[y][x], x, y);
  }

}

/** @function renderBoard()
  * Renders the entire game board.
  */
function renderBoard() {
  if(!ctx) return;
  for(var y = 0; y < 8; y++) {
    for(var x = 0; x < 8; x++) {
      renderSquare(x, y);
    }
  }
}
function SelectedSquare(x,y){

Flip(x,y,0,-1);
Flip(x,y,1,-1);
Flip(x,y,1,0);
Flip(x,y,1,1);
Flip(x,y,0,1);
Flip(x,y,-1,1);
Flip(x,y,-1,0);
Flip(x,y,-1,-1);
}


function RenderReverse(initialX,initialY,x,y,xInc,yInc){

  while(initialX!==x || initialY!==y)
  {


    if(state.turn==='b')
      {

    renderPiece('b',initialX,initialY);
    initialX=initialX+xInc;
    initialY=initialY+yInc;
    }
    else if(state.turn==='w')
    {

    renderPiece('w',initialX,initialY);
    initialX=initialX+xInc;
    initialY=initialY+yInc;

    }
    else {  initialX=initialX+xInc;
      initialY=initialY+yInc;}
}

countPieces();
checkForVictory();
SelectedSquare(x,y);
nextTurn();

}
function Flip(x,y,xInc,yInc){

  var initialX=x;
  var initialY=y;

  if(x+xInc>7||x+xInc<0 || y+yInc>7||y+yInc<0 ){return false;}

      if(state.board[y][x]==='b' || state.board[y][x]==='w'){return false;}
      if(state.board[y+yInc][x+xInc]===null){return false;   }
    if(state.turn==='b')
      {

    if(state.board[y+yInc][x+xInc]!=="w"){ return false;   }

    }

    if(state.turn==='w')
    {
    if(state.board[y+yInc][x+xInc]!=="b"){return false;}
    }

    while((((x)<=7) &&((x)>=0)) && (((y)<=7) && ((y)>=0)) )
    {
if(x+xInc>7||x+xInc<0 || y+yInc>7||y+yInc<0 ){break;}
      if(state.board[y+yInc][x+xInc]===null){break;}
  if((state.turn==='b' && state.board[y][x]==='w') ||(state.turn==='w' && state.board[y][x]==='b'))
    {

      x=x+xInc;
      y=y+yInc;
  }
else {  x=x+xInc;
  y=y+yInc;}


       if(state.turn===state.board[y][x]){
        RenderReverse(initialX,initialY,x,y,xInc,yInc)

        return ;}

    }
return false;
}
function boardPosition(x, y) {
  var boardX = Math.floor(x / 75);
  var boardY = Math.floor(y /75);
  return {x: boardX, y: boardY}
}

function handleMouseDown(event) {
  var position = boardPosition(event.clientX, event.clientY);
  var x = position.x;
  var y = position.y;
  if(x < 0 || y < 0 || x > 9 || y > 9) return;
  SelectedSquare(x,y);
}

function setup() {
  var canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 800;
  canvas.onmousedown = handleMouseDown;
  var  textbox=document.createElement('h2');
  textbox.id='player_turn';
  textbox.innerHTML="  black's turn";
  var white =document. createElement('h2');
  var black = document.createElement('h2');
    var victory = document.createElement('h2');
  white.id="white_count";
  black.id="black_count";
  victory.id='victory_id';
white.innerHTML='white: 0  ';
black.innerHTML='black:  0  ';
  document.body.appendChild(canvas);
  document.body.appendChild(textbox);
  document.body.appendChild(white);
  document.body.appendChild(black);
  document.body.appendChild(victory);
  ctx = canvas.getContext('2d');
  renderBoard();
}

setup();
