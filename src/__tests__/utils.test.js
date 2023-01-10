import {
  nextRotation,
  possibleMove,
  addBlockToGrid,
  checkRows,
  initialGrid,
} from "../utils/utils";

describe("utils", () => {
  it("should return the next shape", () => {
    // let's take the shape of index 1 (I) and the second rotation, since this shape has only 2 rotations the next rotation should be 0
    expect(nextRotation(1, 1)).toEqual(0);
  });
});