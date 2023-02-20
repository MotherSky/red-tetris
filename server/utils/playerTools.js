function checkPlayersExist(players, username) {
	const res = Object.values(players).filter((element) => {
		return element.username === username;
	});

	return res.length;
}

module.exports = {
	checkPlayersExist,
};
