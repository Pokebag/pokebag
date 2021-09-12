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

  async redirects () {
    return [
      {
        source: '/settings',
        destination: '/settings/profile',
        permanent: true,
      },
    ]
  },
})
