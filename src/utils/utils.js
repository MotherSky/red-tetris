import { shapes } from "./shapes";

//generate random number in range(min, max)

export const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//generate the initial grid

export const initialGrid = () => {
  const rows = 20;
  const cols = 10;
  const array = [];

  for (let row = 0; row < rows; row++) {
    array.push([]);
    for (let col = 0; col < cols; col++) {
      array[row].push(0);
    }
  }
  return array;
};

//generate random shape

export const randomShape = () => {
  return random(1, shapes.length - 1);
};

// return the default state of the game

export const defaultState = () => {
  return {
    grid: initialGrid(),
    shape: randomShape(),
    rotation: 0,
    // x:5 and y:-4 to position the shape in the middle top.
    x: 5,
    y: -4,
    nextShape: randomShape(),
    score: 0,
    speed: 1000,
    isRunning: true,
    GameOver: false,
  };
};

// return the index of the next possible rotation

export const nextRotation = (shape, rotation) => {
  return (rotation + 1) % shapes[shape].length;
};

export const possibleMove = (shape, grid, x, y, rotation) => {
  const currentShape = shapes[shape][rotation];
  console.log(currentShape);
  for (let row = 0; row < currentShape.length; row++) {
    for (let col = 0; col < currentShape[row].length; col++) {
      if (currentShape[row][col] !== 0) {
        const proposedX = col + x;
        const proposedY = row + y;
        if (proposedY < 0) {
          continue;
        }
        const possibleRow = grid[proposedY];
        if (possibleRow) {
          if (
            possibleRow[proposedX] === undefined ||
            possibleRow[proposedX] !== 0
          ) {
            return false;
          }
        } else {
          return false;
        }
      }
    }
  }
  return true;
};

// Adds the current shape to grid

export const addBlockToGrid = (shape, grid, x, y, rotation) => {
  // At this point the game is not over
  let blockOffGrid = false;
  const block = shapes[shape][rotation];
  const newGrid = [...grid];
  for (let row = 0; row < block.length; row++) {
    for (let col = 0; col < block[row].length; col++) {
      if (block[row][col]) {
        const yIndex = row + y;
        // If the yIndex is less than 0 part of the block
        // is off the top of the screen and the game is over
        if (yIndex < 0) {
          blockOffGrid = true;
        } else {
          newGrid[row + y][col + x] = shape;
        }
      }
    }
  }
  // Return both the newGrid and the gameOver bool
  return { grid: newGrid, gameOver: blockOffGrid };
};

// Check for complete rows and score points

/*export const checkRows = (grid) => {
  const points = [0, 40, 100, 300, 1200];
  let completedRows = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      // if there is an empty square in row move to next iteration
      if (grid[row][col] === 0) {
        continue;
      }
      completedRows++;
      //remove the row?
      grid.splice(row, 1);
      grid.unshift(Array(10).fill(0));
    }
  }
  return points[completedRows];
};*/

// Checks for completed rows and scores points
export const checkRows = (grid) => {
  // Points increase for each row completed
  // i.e. 40 points for completing one row, 100 points for two rows
  const points = [0, 40, 100, 300, 1200];
  let completedRows = 0;
  for (let row = 0; row < grid.length; row++) {
    // No empty cells means it can't find a 0, so the row must be complete!
    if (grid[row].indexOf(0) === -1) {
      completedRows += 1;
      // Remove the row and add a new empty one at the top
      grid.splice(row, 1);
      grid.unshift(Array(10).fill(0));
    }
  }
  return points[completedRows];
};
