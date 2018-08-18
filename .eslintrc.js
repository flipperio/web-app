const path = require('path');

module.exports = {
	env: {
		'browser': true,
	},
	extends: [
		'eslint-config-airbnb',
		path.resolve(__dirname, 'linting/.eslintrc-chox.js'),
		path.resolve(__dirname, 'linting/.eslintrc-import.js'),
		path.resolve(__dirname, 'linting/.eslintrc-react.js'),
		path.resolve(__dirname, 'linting/.eslintrc-jsx-a11y.js'),
	],
}
