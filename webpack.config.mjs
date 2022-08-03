/**
 * @param {*} env
 * @param {{mode: ("none" | "development" | "production")}} argv
 * @return {import('webpack').Configuration}
 */
export default (env, argv) => ({
	entry: {
		setup: './src/setup.ts',
	},
	output: {
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
							emitDeclarationOnly: false,
							declaration: false,
							outDir: 'ts-out',
						},
					},
				}],
			},
		],
	},
});
