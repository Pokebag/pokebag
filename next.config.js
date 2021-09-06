const withPlugins = require('next-compose-plugins')

const plugins = [
	// withMDX
	require('@next/mdx')({
		extension: /\.mdx$/,
	}),
]


module.exports = withPlugins(plugins, {
	experimental: {
		esmExternals: true,
	},
	pageExtensions: ['js', 'mdx'],
})
