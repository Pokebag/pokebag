export async function getItemProps(context) {
	const { params } = context
	const [
		fs,
		path,
	] = await Promise.all([
		import('fs/promises'),
		import('path'),
	])

	const itemPath = path.resolve(process.cwd(), 'src', 'data', 'items', `${params.itemID}.json`)
	const item = JSON.parse(await fs.readFile(itemPath, 'utf8'))

	return {
		props: { item },
	}
}
