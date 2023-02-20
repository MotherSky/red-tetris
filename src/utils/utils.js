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

// return the default state of the game

export const defaultState = () => {
  return {
    grid: initialGrid(),
    shape: 0,
    rotation: 0,
    // x:5 and y:-4 to position the shape in the middle top.
    x: 4,
    y: -4,
    nextShape: 0,
    score: 0,
    gameOver: false,
    winner: undefined,
    gameStart: false
  };
};
