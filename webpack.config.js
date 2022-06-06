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

	module: {
		rules: [
			{
				test: /\.ts$/i,
				use: [{
					loader: 'ts-loader',
					options: {
						allowTsInNodeModules: true,
						compilerOptions: {
							noEmit: false,
							outDir: 'ts-tmp',
						},
					},
				}],
			},
		],
	},
});
