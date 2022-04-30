const path = require('path');

module.exports = (env, argv) => ({
	entry: {
		setup: './src/setup.ts',
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].js',
	},
	target: 'node',
	devtool: argv.mode === 'development' ? 'inline-source-map' : undefined,
	resolve: {
		extensions: ['.js', '.ts'],
	},
	externalsType: 'commonjs',
	externals: ['../fasm_versions.json'],
	module: {
		rules: [
			{
				test: /\.ts$/i,
				use: 'ts-loader',
			},
		],
	},
});
