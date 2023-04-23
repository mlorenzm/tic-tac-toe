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
  players = []
  //Active player is Player one
  let activePlayer = players[0]

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0]
  }
  const getActivePlayer = () => {
    return activePlayer
  }
  // only for console implementation
  const printNewRound = () => {
    gameBoard.getBoard()
    console.log(`${getActivePlayer().getName()}'s turn.`)
  }
  const getBoard = () => {
    return gameBoard.getBoard()
  }
  const playRound = (index) => {
    console.log(index)
    gameBoard.placeToken(gameBoard.getBoard(), activePlayer, index)
    console.log(gameBoard.getBoard())
    switchPlayerTurn()
  }

  const getWinnerToken = () => {
    result = players.find(
      (item) => item.getToken() == gameController.checkWin()
    )
    console.log(`${result.getName()} wins!`)
  }
  // Manually check each win case. Return either false (no winners yet), or winner's token
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
    return false
  }
  const resetGame = () => {
    for (let i = 0; i < gameBoard.getBoard().length; i++) {
      gameBoard.getBoard()[i] = ''
    }
    activePlayer = players[0]
  }
  const playGame = () => {
    for (let turn = 0; turn < 9; turn++) {
      checkWin()
      if (checkWin() != false) {
        getWinnerToken()
        return
      }
      playRound()
      if (turn == 8 && checkWin() == false) {
        console.log("It's a tie!")
      }
    }
  }
  return {
    playGame,
    resetGame,
    getWinnerToken,
    checkWin,
    playRound,
    activePlayer,
    getBoard,
    switchPlayerTurn,
    players,
    printNewRound,
    getActivePlayer,
  }
})()

const displayController = (() => {
  const startBtn = document.getElementById('start'),
    main = document.getElementById('main'),
    playerTurnDiv = document.getElementById('player-turn')
  boardContainer = document.getElementById('board-container')
  // Functions
  toggleScreen = () => {
    event.preventDefault()
    const children = main.children
    for (const child of main.children) {
      child.classList.toggle('hidden')
    }
  }
  const createPlayers = () => {
    event.preventDefault()
    let playerOneValue = document.getElementById('p1').value
    if (playerOneValue == '') {
      playerOneValue = 'Player One'
    }
    let playerTwoValue = document.getElementById('p2').value
    if (playerTwoValue == '') {
      playerTwoValue = 'Player Two'
    }
    let p1 = playerFactory(playerOneValue, 'X')
    let p2 = playerFactory(playerTwoValue, 'O')
    players.push(p1, p2)
    gameController.switchPlayerTurn()
    announceActivePlayer()
  }
  const getClickedCell = (e) => {
    return e.target.dataset.value
  }
  const announceActivePlayer = () => {
    playerTurnDiv.textContent = `It's ${gameController
      .getActivePlayer()
      .getName()}'s turn`
  }
  // Events
  startBtn.addEventListener('click', toggleScreen)
  startBtn.addEventListener('click', createPlayers)

  boardContainer.addEventListener(
    'click',
    gameController.playRound((e) => {
      return e.target.dataset.value
    })
  )
  return {
    boardContainer,
    announceActivePlayer,
    getClickedCell,
    toggleScreen,
    createPlayers,
  }
})()

// displayController.toggleScreen()
