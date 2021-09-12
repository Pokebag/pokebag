export async function getTagsProps() {
	const [
		fs,
		path,
	] = await Promise.all([
		import('fs/promises'),
		import('path'),
	])

	const tagsPath = path.resolve(process.cwd(), 'src', 'data', 'tags.json')
	const tags = JSON.parse(await fs.readFile(tagsPath, 'utf8'))

	return {
		props: { tags },
	}
}
