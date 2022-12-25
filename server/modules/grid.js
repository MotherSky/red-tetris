const Grid = class {
	constructor(rows, cols) {
		this.rows = rows;
		this.cols = cols;
		this.playground = this.initialGrid(rows, cols);
	}

	initialGrid = (rows, cols) => {
		const array = [];

		for (let row = 0; row < rows; row++) {
			array.push([]);
			for (let col = 0; col < cols; col++) {
				array[row].push(0);
			}
		}
		return array;
	};
};

exports.Grid = Grid;
