// This only serves a purpose: toggle between start screen and main game
const displayController = (() => {
  const startBtn = document.getElementById('start'),
    main = document.getElementById('main')

  toggleScreen = () => {
    const children = main.children
    for (const child of main.children) {
      child.classList.toggle('hidden')
    }
  }

  // Events

  startBtn.addEventListener('click', toggleScreen)

  return { toggleScreen: toggleScreen }
})()

// Factory for players
const playerFactory = (symbol) => {
  symbol = symbol
  const getSymbol = () => {
    return symbol
  }
  return { getSymbol }
}

//displayController??
