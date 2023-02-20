const random = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const RandomTetros = (nb) => {
	const tetroList = [];
	for (let i = 1; i <= nb; i++) {
		tetroList.push(random(1, 7));
	}
	return tetroList;
};

module.exports = RandomTetros;
