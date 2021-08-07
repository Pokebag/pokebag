export async function getItemsProps() {
	const [
		fs,
		path,
	] = await Promise.all([
		import('fs/promises'),
		import('path'),
	])

	const itemsPath = path.resolve(process.cwd(), 'src', 'data', 'items')

	const itemFiles = await fs.readdir(itemsPath)
	const itemDetails = await Promise.all(itemFiles.map(itemFilename => {
		const itemFilePath = path.resolve(itemsPath, itemFilename)
		return fs.readFile(itemFilePath, 'utf8')
	}))

	const items = itemFiles.reduce((accumulator, itemFilename, index) => {
		accumulator[itemFilename] = {
			...JSON.parse(itemDetails[index]),
			id: itemFilename.replace(/\.json$/, '')
		}
		return accumulator
	}, {})

	return {
		props: {
			items,
		},
	}
}
