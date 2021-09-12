export async function getArticlesProps() {
	const [
		{ default: frontmatter },
		fs,
		path,
	] = await Promise.all([
		import('gray-matter'),
		import('fs/promises'),
		import('path'),
	])

	const blogDirectoryPath = path.resolve('src', 'articles')

	const filenames = await fs.readdir(blogDirectoryPath)
	const articleFilenames = filenames.reduce((accumulator, filename) => {
		if (filename.endsWith('.mdx')) {
			accumulator.push(filename)
		}

		return accumulator
	}, [])

	const articleFiles = await Promise.all(articleFilenames.map(filename => {
		return fs.readFile(path.resolve(blogDirectoryPath, filename), 'utf8')
	}))

	const articles = articleFiles.reduce((accumulator, fileContents, index) => {
		const {
			data,
			excerpt,
		} = frontmatter(fileContents)
		const filename = articleFilenames[index]

		accumulator.push(JSON.parse(JSON.stringify({
			...data,
			slug: filename.replace(/\.mdx$/, ''),
		})))

		return accumulator
	}, [])

	return {
		props: {
			articles,
		},
	}
}
