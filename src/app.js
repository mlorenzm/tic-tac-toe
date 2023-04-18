const a = (() => {
  // DOM
  const startBtn = document.getElementById('start')
  const main = document.getElementById('main')
  const gameContainer = document.getElementById('game-container')
  function toggleChildren() {
    children = main.children
    for (const child of main.children) {
      child.classList.toggle('hidden')
    }
  }
  // Events
  startBtn.addEventListener('click', toggleChildren)
  startBtn.addEventListener('click', () => {
    console.log('a')
  })

  function renderBoard() {
    gameContainer.classList.add('grid', 'grid-cols-3', 'gap-3')
    for (let i = 0; i < 9; i++) {
      cell = document.createElement('div')
      cell.classList.add('w-36', 'h-36', 'bg-slate-600', 'rounded')

      gameContainer.appendChild(cell)
    }
  }
  return { toggleChildren: toggleChildren, renderBoard: renderBoard }
})()
