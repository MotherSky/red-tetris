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
      // Get the next potential Y position
      const maybeY = y + 1;
      // Check if the current block can move here
      if (possibleMove(shape, grid, x, maybeY, rotation)) {
        // If so move the block
        return { ...state, y: maybeY };
      }
      // If not place the block
      const newGrid = addBlockToGrid(shape, grid, x, y, rotation);
      // reset some things to start a new shape/block
      const newState = defaultState();
      newState.grid = newGrid;
      newState.shape = nextShape;
      newState.nextShape = randomShape();
      newState.score = score;
      newState.isRunning = isRunning;

      if (!possibleMove(nextShape, newGrid, 0, 4, 0)) {
        // Game Over
        console.log("Game Should be over...");
        newState.shape = 0;
        return { ...state, gameOver: true };
      }
      // Update the score based on if rows were completed or not
      newState.score = score + checkRows(newGrid);

      return newState;

    case RESUME:
      return { ...state, isRunning: true };

    case PAUSE:
      return { ...state, isRunning: false };

    case GAME_OVER:
      return state;

    case RESTART:
      return state;

    default:
      return state;
  }
};

export default gameReducer;
