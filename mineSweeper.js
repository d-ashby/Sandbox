document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  let width = 10
  let bombAmount = 20
  let squares = []

  // create board
  function createBoard() {
    // get shuffled game array with random bombs
    const bombsArray = Array(bombAmount).fill('bomb')
    const emptyArray = Array(width * width - bombAmount).fill('valid')
    const gameArray = emptyArray.concat(bombsArray)
    const shuffledArray = gameArray.sort(() => Math.random() - 0.5)

    for (let i = 0; i < width * width; i++) {
      const square = document.createElement('div')
      square.setAttribute('id', i)
      square.classList.add(shuffledArray[i])
      grid.appendChild(square)
      squares.push(square)

      // event listening to normal click
      square.addEventListener('click', function (e) {
        click(square)
      })
    }

    //add numbers
    for (let i = 0; i < squares.length; i++) {
      let total = 0
      // this creats a boolean, checks to see if the squares to the left of the square does not exist do not check for example all squareson the left a multiples of 10. 10 / width (10) leaves a remainder of 0  this means true
      const isLeftEdge = i % width === 0
      // this checks to see if the squares to the right of the square exist. 9, 19, 29, 39 ect.. 29 % width does = width -1 as width = 10
      const isRightEdge = i % width === width - 1

      if (squares[i].classList.contains('valid')) {
        // if i is bigger than zero and is not hit into a bang, and is not at the left edge and the squares to the left of it contain a bomb we want to add 1 to the total. if the square index is larger than 0 - we dont want to check this square because there are no squares to the left of 0. it is not at the left edge AND if the square to the left of the square (- 1 to the index ie [i-1]) contains the class bomb, add 1 to the total. we only add one if all three statements are true.
        if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains('bomb'))
          total++
        // this checks the square 9 squares greater than the last square checked. for example say we were up to square 2 count 9 from 2 = 11 which is the southwest position on our grid. then it checks to see if it is at the right edge - this will happen when counting from multiples of 10. this counts to the position in the north east by adding one to the index it moves the checking position to the right, then we minus width and width is = 10 so for example say our position is div 12 +1 = 13 - 10 = 3. Square three is at the north east position of 12.
        if (
          i > 9 &&
          !isRightEdge &&
          squares[i + 1 - width].classList.contains('bomb')
        )
          total++
        // if i is bigger than 10 and the square above it has a bomb add one to the total
        if (i > 10 && squares[i - width].classList.contains('bomb')) total++
        // if i is bigger than 11 and is not at the left edge and the square directly to the left of it and one row up contains a bomb add one to the total
        if (
          i > 11 &&
          !isLeftEdge &&
          squares[i - 1 - width].classList.contains('bomb')
        )
          total++
        // if i is smaller than 98 and is not at the right edge and the square directly to the right of it contains a bomb add one to the toal
        if (i < 98 && !isRightEdge && squares[i + 1].classList.contains('bomb'))
          total++
        // if i is less than 90 and is not at the left edge and the square directly to the left and one whole width below contain a bomb add one to the total
        if (
          i < 90 &&
          !isLeftEdge &&
          squares[i - 1 + width].classList.contains('bomb')
        )
          total++
        // if i smaller than 88 and is not at the right edge and the squares to the right plus one row down add 1
        if (
          i < 88 &&
          !isRightEdge &&
          squares[i + 1 + width].classList.contains('bomb')
        )
          total++
        //  if i is less than 89 and the square directly below it contains a bomb add 1 to the toal
        if (i < 89 && squares[i + width].classList.contains('bomb')) total++
        //
        squares[i].setAttribute('data', total)
      }
    }
  }
  createBoard()

  // define click function
  function click(square) {
    if (square.classList.contains('bomb')) {
      alert('Game Over')
    }
  }
})
