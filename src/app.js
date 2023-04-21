// const displayController = (() => {
//   const startBtn = document.getElementById('start'),
//     main = document.getElementById('main'),
//     submitBtn = document.getElementById('start-game')

//   // document.querySelector("input[type='radio'][name=rate]:checked").value
//   // Functions
//   toggleScreen = () => {
//     const children = main.children
//     for (const child of main.children) {
//       child.classList.toggle('hidden')
//     }
//   }
//   createPlayers = (event) => {
//     p1 = playerFactory(
//       document.querySelector("input[type='radio'][name=p1-symbol]:checked")
//         .value
//     )
//     p2 = playerFactory(
//       document.querySelector("input[type='radio'][name=p2-symbol]:checked")
//         .value
//     )
//   }
//   // Events
//   submitBtn.addEventListener('click', createPlayers)
//   startBtn.addEventListener('click', toggleScreen)

//   return { toggleScreen: toggleScreen, createPlayers: createPlayers }
// })()

//Gameboard, represents the state of the board
const gameBoard = (() => {
  // our board is an array of 3x3
  board = ['', '', '', '', '', '', '', '', '']
  // we need a method to export our board
  const getBoard = () => board

  // we need a method to modify our board with current player's token on board's

  const placeToken = (board, player, index) => {
    // Allow to only place on empty positions (legal moves)
    if (board[index] === '') {
      board[index] = player.getToken()
    } else {
      return // i need this to prompt again when an illegal move is selected
    }
  }
  return { getBoard, placeToken }
})()

// Factory function for creating new players
const playerFactory = (name, token) => {
  name = name
  token = token
  const getToken = () => {
    return token
  }
  const getName = () => {
    return name
  }
  return { getToken, getName }
}
// Controls game flow
const gameController = (() => {
  player1 = playerFactory('PlayerOne', 'X')
  player2 = playerFactory('PlayerTwo', 'O')

  players = [player1, player2]
  //Active player is Player one
  let activePlayer = players[0]

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0]
  }
  const getActivePlayer = () => activePlayer
  // only for console implementation
  const printNewRound = () => {
    gameBoard.getBoard()
    console.log(`${getActivePlayer().getName()}'s turn.`)
  }
  const getBoard = () => {
    return gameBoard.getBoard()
  }
  const playRound = () => {
    index = prompt(`${activePlayer.getName()}, select position [0-9]`)
    gameBoard.placeToken(gameBoard.getBoard(), activePlayer, index)
    console.log(gameBoard.getBoard())
    switchPlayerTurn()
    checkWin()
  }

  // Manually check each win case. Return either an empty string (no winners yet), or winner's token

  const checkWin = () => {
    //  1st row
    if (
      gameBoard.getBoard()[0] == gameBoard.getBoard()[1] &&
      gameBoard.getBoard()[0] == gameBoard.getBoard()[2] &&
      gameBoard.getBoard()[0] != ''
    ) {
      return gameBoard.getBoard()[0]
      //  2nd row
    } else if (
      gameBoard.getBoard()[3] == gameBoard.getBoard()[4] &&
      gameBoard.getBoard()[3] == gameBoard.getBoard()[5] &&
      gameBoard.getBoard()[3] != ''
    ) {
      return gameBoard.getBoard()[3]
      //  3rd row
    } else if (
      gameBoard.getBoard()[6] == gameBoard.getBoard()[7] &&
      gameBoard.getBoard()[6] == gameBoard.getBoard()[8] &&
      gameBoard.getBoard()[6] != ''
    ) {
      return gameBoard.getBoard()[6]
      // 1st column
    } else if (
      gameBoard.getBoard()[0] == gameBoard.getBoard()[3] &&
      gameBoard.getBoard()[0] == gameBoard.getBoard()[6] &&
      gameBoard.getBoard()[0] != ''
    ) {
      return gameBoard.getBoard()[0]
      //  2nd column
    } else if (
      gameBoard.getBoard()[1] == gameBoard.getBoard()[4] &&
      gameBoard.getBoard()[1] == gameBoard.getBoard()[7] &&
      gameBoard.getBoard()[1] != ''
    ) {
      return gameBoard.getBoard()[1]
      // 3rd column
    } else if (
      gameBoard.getBoard()[2] == gameBoard.getBoard()[5] &&
      gameBoard.getBoard()[2] == gameBoard.getBoard()[8] &&
      gameBoard.getBoard()[2] != ''
    ) {
      return gameBoard.getBoard()[2]
      // Diagonal forward
    } else if (
      gameBoard.getBoard()[0] == gameBoard.getBoard()[4] &&
      gameBoard.getBoard()[0] == gameBoard.getBoard()[8] &&
      gameBoard.getBoard()[0] != ''
    ) {
      return gameBoard.getBoard()[0]
      // Diagonal backwards
    } else if (
      gameBoard.getBoard()[2] == gameBoard.getBoard()[4] &&
      gameBoard.getBoard()[2] == gameBoard.getBoard()[6] &&
      gameBoard.getBoard()[2] != ''
    ) {
      return gameBoard.getBoard()[2]
    }
    return false //
  }

  return {
    checkWin,
    playRound,
    activePlayer,
    getBoard,
    switchPlayerTurn,
    activePlayer,
    printNewRound,
    getActivePlayer,
  }
})()
