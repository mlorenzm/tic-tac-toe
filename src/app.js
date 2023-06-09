//Gameboard, represents the state of the board
const gameBoard = (() => {
  // our board is an array of 3x3
  board = ['', '', '', '', '', '', '', '', '']
  let turn = 1
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

  return { turn, getBoard, placeToken }
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

  const getBoard = () => {
    return gameBoard.getBoard()
  }
  const playRound = (e) => {
    index = e.target.dataset.value
    gameBoard.placeToken(gameBoard.getBoard(), activePlayer, index)
    e.target.textContent = getActivePlayer().getToken()
    e.target.removeEventListener('click', gameController.playRound)

    if (checkWin() == false && gameBoard.turn == 9) {
      announceWinner(true)
    } else if (checkWin() == false) {
      gameBoard.turn++
      switchPlayerTurn()
      displayController.announceActivePlayer()
    } else {
      announceWinner()
    }
  }

  const announceWinner = (tie) => {
    const modal = document.createElement('div')
    modal.classList.add(
      'bg-gray-900',
      'bg-opacity-20',
      'grid',
      'place-items-center',
      'absolute',
      'h-screen',
      'w-screen'
    )
    const modalBox = document.createElement('div')
    modalBox.classList.add(
      'bg-gray-100',
      'flex',
      'flex-col',
      'justify-center',
      'items-center',
      'gap-9',
      'mt-6',
      'shadow-lg',
      'p-6',
      'rounded-lg',
      'w-3/4',
      'h-1/2',
      'p-4',
      'pl-6'
    )
    let modalContent = document.createElement('p')

    modalContent.classList.add('font-black', 'text-6xl')
    if (tie == true) {
      modalContent.textContent = "It's a tie!"
    } else {
      modalContent.textContent = `${getWinnerInfo().winner.getName()}, with token '${getWinnerInfo().winner.getToken()}' wins!`
    }
    let resetButton = document.createElement('button')
    resetButton.classList.add(
      'bg-white',
      'text-lg',
      'w-40',
      'font-bold',
      'px-4',
      'py-4',
      'rounded-md',
      'hover:bg-gray-100',
      'border',
      'shadow-sm',
      'transition-all',
      'hover:shadow-md',
      'cursor-pointer',
      'self-center'
    )
    resetButton.textContent = 'Play Again?'
    resetButton.addEventListener('click', resetGame)
    modalBox.append(modalContent, resetButton)
    modal.append(modalBox)
    main.append(modal)
  }
  const getWinnerInfo = () => {
    let winner = players.find(
      (item) => item.getToken() == gameController.checkWin()
    )
    return { winner }
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
    console.log('resetting')
    for (let i = 0; i < gameBoard.getBoard().length; i++) {
      gameBoard.getBoard()[i] = ''
    }
    players = []
    main.removeChild(main.lastChild)
    toggleScreen()
    gameBoard.turn = 1
    for (let i = 0; i < boardContainer.children.length; i++) {
      boardContainer.children[i].textContent = ''
      boardContainer.children[i].addEventListener(
        'click',
        gameController.playRound
      )
    }
  }

  return {
    announceWinner,
    resetGame,
    getWinnerInfo,
    checkWin,
    playRound,
    activePlayer,
    getBoard,
    switchPlayerTurn,
    getActivePlayer,
  }
})()

// DOM
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

  for (let i = 0; i < boardContainer.children.length; i++) {
    boardContainer.children[i].addEventListener(
      'click',
      gameController.playRound
    )
  }
  return {
    boardContainer,
    announceActivePlayer,
    getClickedCell,
    toggleScreen,
    createPlayers,
  }
})()
