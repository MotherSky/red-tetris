import {
  MOVE_RIGHT,
  MOVE_LEFT,
  MOVE_DOWN,
  ROTATE,
  PAUSE,
  RESUME,
  RESTART,
  GAME_OVER,
} from "../actions";

import {
  defaultState,
  nextRotation,
  possibleMove,
  addBlockToGrid,
  checkRows,
  randomShape,
} from "../utils/utils";

const gameReducer = (state = defaultState(), action) => {
  const { shape, grid, x, y, rotation, nextShape, score, isRunning } = state;

  switch (action.type) {
    case ROTATE:
      // check if there is any collision when rotating
      const newRotation = nextRotation(shape, rotation);
      if (possibleMove(shape, grid, x, y, newRotation)) {
        return { ...state, rotation: newRotation };
      }
      return state;

    case MOVE_RIGHT:
      //check if there any collision when x = x + 1 then move
      if (possibleMove(shape, grid, x + 1, y, rotation)) {
        return { ...state, x: x + 1 };
      }
      return state;

    case MOVE_LEFT:
      //check if there any collision when x = x - 1 then move
      if (possibleMove(shape, grid, x - 1, y, rotation)) {
        return { ...state, x: x - 1 };
      }
      return state;

    case MOVE_DOWN:
      //check if there any collision when y = y + 1 then move
      if (possibleMove(shape, grid, x, y + 1, rotation)) {
        return { ...state, y: y + 1 };
      }
      // if not place the block
      const newGrid = addBlockToGrid(shape, grid, x, y, rotation);
      const newState = defaultState();
      newState.grid = newGrid;
      newState.shape = nextShape;
      newState.score = score;
      newState.isRunning = isRunning;
      // if there is no room for the next shape, the game is over
      if (!possibleMove(nextShape, newGrid, 0, 4, 0)) {
        console.log("Game Should be over...");
        newState.shape = 0;
        return { ...state, gameOver: true };
      }
      // update score
      newState.score = score + checkRows(newGrid);
      return newState;

    case RESUME:
      return state;

    case PAUSE:
      return state;

    case GAME_OVER:
      return state;

    case RESTART:
      return state;

    default:
      return state;
  }
};

export default gameReducer;
