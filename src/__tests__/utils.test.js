import {
  nextRotation,
  possibleMove,
  addBlockToGrid,
  checkRows,
} from "../utils/utils";

describe("utils", () => {
  it("should return the next shape", () => {
    // let's take the shape of index 1 (I) and the second rotation, since this shape has only 2 rotations the next rotation should be 0
    expect(nextRotation(1, 1)).toEqual(0);
  });

  it("should return if the move is possible or not", () => {
    
  })
});

//  utils.js | 35 | 0 | 50 | 35.84 | 52,56-79,86-104,111-122           