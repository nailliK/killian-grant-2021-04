const path = require("path");
const {VueLoaderPlugin} = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
	cache: false,
	mode: process.env.NODE_ENV ? "production" : "development",
	entry: {
		index: path.resolve(__dirname, "./src/ts/main.ts")
	},
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "[name].js",
		publicPath: "/"
	},
	target: "web",
	module: {
		rules: [
			{
				test: /\.vue$/,
				use: "vue-loader"
			},
			{
				test: /\.ts$/,
				loader: "ts-loader",
				options: {
					appendTsSuffixTo: [/\.vue$/]
				}
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "babel-loader"
					}
				]
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					{
						loader: "style-loader"
					},
					{
						loader: "css-loader"
					},
					{
						loader: "sass-loader"
					}
				]
			},
			{
				test: /\.(woff(2)?|ttf|otf|eot|svg|ico|jpg|png|gif)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]"
						}
					}
				]
			}
		]
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src")
		},
		extensions: [
			".ts",
			".js",
			".vue",
			".json"
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/html/index.html",
			inject: true,
			chunks: ["index"],
			filename: "index.html"
		}),
		new VueLoaderPlugin()
	],
	devServer: {
		hot: true,
		port: 8888,
		contentBase: path.resolve(__dirname, "./dist"),
		historyApiFallback: true
	},
	optimization: {
		splitChunks: {
			chunks: "async",
			minSize: 20000,
			minRemainingSize: 0,
			maxSize: 100000,
			minChunks: 1,
			maxAsyncRequests: 30,
			maxInitialRequests: 30,
			enforceSizeThreshold: 100000,
			cacheGroups: {
				defaultVendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
					reuseExistingChunk: true
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true
				}
			}
		},
		minimize: true,
		minimizer: [
			new CssMinimizerPlugin()
		]
	}
};
