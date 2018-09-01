const path = require('path');
const convert = require('koa-connect');
const history = require('connect-history-api-fallback');

module.exports = {
	mode: 'development',
	entry: path.join(__dirname, 'src/index.jsx'),
	output: {
		path: path.join(__dirname, 'dist/js'),
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json']
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: '/node_modules',
				loader: 'eslint-loader',
				enforce: 'pre',
				options: {
					failOnError: true,
					fix: true
				}
			},
			{
				test: /\.jsx?$/,
				exclude: '/node_modules',
				loader: 'babel-loader'
			}
		]
	},
	serve: {
		content: path.join(__dirname, 'dist'),
		clipboard: false,
		port: 8080,
		host: '0.0.0.0',
		devMiddleware: {
			publicPath: '/js'
		},
		add: function(app) {
			app.use(convert(history()));
		}
	}
};
