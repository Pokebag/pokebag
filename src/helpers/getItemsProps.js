export async function getItemsProps() {
	const [
		{ encode: encodeBlurhash },
		fs,
		path,
		{ default: sharp },
	] = await Promise.all([
		import('blurhash'),
		import('fs/promises'),
		import('path'),
		import('sharp'),
	])

	const getItemBlurhash = async itemID => {
		const imagePath = path.resolve(process.cwd(), 'public', 'images', 'items', `${itemID}.png`)
		const imageBuffer = await fs.readFile(imagePath)
		const modifiedImageBuffer = await sharp(imageBuffer)
			.raw()
			.ensureAlpha()
			.resize(10, 10)
			.toBuffer()

		return encodeBlurhash(new Uint8ClampedArray(modifiedImageBuffer), 10, 10, 4, 4)
	}

	const itemsPath = path.resolve(process.cwd(), 'src', 'data', 'items')
	const itemFilePaths = await fs.readdir(itemsPath)
	const itemPromises = await Promise.all(itemFilePaths.map(itemFilename => {
		const itemID = itemFilename.replace(/\.json$/, '')

		return Promise.all([
			itemID,
			fs.readFile(path.resolve(itemsPath, itemFilename), 'utf8'),
			getItemBlurhash(itemID),
		])
	}))

	const items = itemPromises.reduce((accumulator, [itemID, jsonString, blurhash]) => {
		accumulator[itemID] = JSON.parse(jsonString)
		accumulator[itemID].id = itemID
		accumulator[itemID].blurDataURL = blurhash

		return accumulator
	}, {})

	return {
		props: {
			items,
		},
	}
}
