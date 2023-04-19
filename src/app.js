const dom = (() => {
  // DOM
  const startBtn = document.getElementById('start')
  const main = document.getElementById('main')
  const gameContainer = document.getElementById('game-container')
  function toggleChildren() {
    let children = main.children
    for (const child of main.children) {
      child.classList.toggle('hidden')
    }
  }
  // Events
  startBtn.addEventListener('click', toggleChildren)
  startBtn.addEventListener('click', () => {
    console.log('a')
  })

  return { toggleChildren: toggleChildren }
})()

// const Player = (symbol, array) => {
//   const symb = symbol
//   const pickCell = (array) => {
//     for (i of array) {
//       console.log(i)
//     }
//   }
//   return { pickCell: pickCell() }}
// const p1 = Player('circle', dom.cells)
// Factory para players

//Factory para games

//displayController??

const gameBoard = (() => {
  let board = dom.cells
  function renderBoard() {}
  return { board: board }
})()
