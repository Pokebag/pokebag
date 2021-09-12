export async function getArticlesPaths() {
	const [
		fs,
		path,
	] = await Promise.all([
		import('fs/promises'),
		import('path'),
	])

	const blogDirectoryPath = path.resolve('src', 'articles')

	const filenames = await fs.readdir(blogDirectoryPath)
	const paths = filenames.reduce((accumulator, filename) => {
		if (filename.endsWith('.mdx')) {
			accumulator.push({
				params: {
					slug: filename.replace(/\.mdx$/, ''),
				},
			})
		}

		return accumulator
	}, [])

	return {
		fallback: false,
		paths,
	}
}
