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

export const possibleMove = (shape, rotation, grid, x, y) => {
  const currentShape = shapes[shape][rotation];
  // loop through rows and cols of the shape
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
          } else {
            return false;
          }
        }
      }
    }
  }
  return true;
};
