let canvas = document.querySelector("#gameCanvas");
let ctx = canvas.getContext("2d");

let text = document.querySelector("#depth");

let boardWidth = 7;
let boardHeight = 6;
let boardDepth = 2;
let currentLayer = 0;

let currentPlayer = 0;

text.innerText = currentLayer;


let board = new Array();
for (let i = 0; i < boardWidth; i++) {
  board[i] = new Array();
  for (let j = 0; j < boardHeight; j++) {
    board[i][j] = new Array();
    for (let g = 0; g < boardDepth; g++) {
      board[i][j][g] = 2;
    }
  }
}

function drawLayOut() {

  ctx.fillStyle = "black";
  let jumpAmount = canvas.width / boardWidth;
  let i = jumpAmount;
  while (i < canvas.width) {
    ctx.fillRect(i, 0 + 50, 3, canvas.height - 50);
    i += jumpAmount;
  }

  jumpAmount = (canvas.height - 50) / boardHeight;
  i = jumpAmount;
  while (i < canvas.height - 50) {
    ctx.fillRect(0, i + 50, canvas.width, 3);
    i += jumpAmount;
  }


  jumpAmountX = canvas.width / boardWidth;
  jumpAmountY = (canvas.height - 50) / boardHeight;
  i = boardHeight - 1;

  console.log(currentLayer)

  while (i >= 0) {
    for (let j = 0; j < boardWidth; j++) {
      for (let i = 0; i < boardHeight; i++) {
        for (let g = 0; g < boardDepth; g++) {

          if (board[j][i][currentLayer] == 0) {
            ctx.fillStyle = "red";
          } else {
            ctx.fillStyle = "blue";
          }

          if (board[j][i][currentLayer] != 2) {

            board[j][i][currentLayer] = currentPlayer;

            ctx.fillRect((j * jumpAmountX) + jumpAmountX / 2, (i * jumpAmountY) + jumpAmountY + 50 / 2, 5, 5)

            currentPlayer = (currentPlayer + 1) % 2
            break;
          }

        }
      }

    }
    i--;
  }
}


canvas.addEventListener("click", (data) => {
  let x = Math.floor(data.x / canvas.width * boardWidth);

  if (currentPlayer == 0) {
    ctx.fillStyle = "red";
  } else {
    ctx.fillStyle = "blue";
  }

  let jumpAmountX = canvas.width / boardWidth;
  let jumpAmountY = (canvas.height - 50) / boardHeight;
  i = boardHeight - 1;

  while (i >= 0) {
    if (board[x][i][currentLayer] == 2) {
      board[x][i][currentLayer] = currentPlayer;

      ctx.fillRect((x * jumpAmountX) + jumpAmountX / 2, (i * jumpAmountY) + jumpAmountY + 50 / 2, 5, 5)


      if (playerWon(x, i, currentLayer)) {
        console.log(currentPlayer + " has won")
      }
      currentPlayer = (currentPlayer + 1) % 2

      break;
    }
    i--;
  }
})

document.addEventListener("keypress", key => {
  if (key.key != "w") {
    return
  }
  if (key.key == "w") {
    currentLayer = (currentLayer + 1) % boardDepth;
  }
  text.innerText = currentLayer;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawLayOut();
})

function playerWon(x, y, z) {
  let amount = 0;
  for (let i = 0; i < board.length; i++) {
    if (board[i][y][z] == currentPlayer) {
      amount += 1;
    } else {
      amount == 0;
    }
    if (amount == 4) {
      return true;
    }
  }
  amount = 0;
  for (let i = 0; i < board[x].length; i++) {
    if (board[x][i][z] == currentPlayer) {
      amount += 1;
    } else {
      amount == 0;
    }
    if (amount == 4) {
      return true;
    }
  }
  amount = 0;
  for (let i = 0; i < board[x][y].length; i++) {
    if (board[x][y][i] == currentPlayer) {
      amount += 1;
    } else {
      amount == 0;
    }
    if (amount == 4) {
      return true;
    }
  }



  return false;
}

drawLayOut();