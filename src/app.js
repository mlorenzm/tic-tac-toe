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
  const getBoard = () => {
    return board
  }
  // we need a method to modify our board with current player's token on board's[index] position
  const placeToken = (board, player, index) => {
    // Here, we first need to see which positions are available (empty) on our array
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
player1 = playerFactory('a', 'x')
player2 = playerFactory('a', '0')
// Controls game flow
const gameController = (player1, player2) => {}
