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
  arrayboard = ['', '', '', '', '', '', '', '', '']
  // we need a method to export our board
  const getBoard = () => {
    return { arrayboard }
  }

  // we need a method to modify our board with current player's token on board's

  const placeToken = (board, player, index) => {
    // Allow to only place on empty positions (legal moves)
    if (board[index] === '') {
      board[index] = player.getToken()
    } else {
      return
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
  board = gameBoard
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
    board.getBoard()
    console.log(`${getActivePlayer().getName()}'s turn.`)
  }
  const getBoard = () => {
    return board.getBoard()
  }
  return {
    getBoard,
    switchPlayerTurn,
    activePlayer,
    printNewRound,
    getActivePlayer,
  }
})()
