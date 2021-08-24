// Module imports
import { encode as encodeBlurhash } from 'blurhash'
import fs from 'fs/promises'
import path from 'path'
import sharp from 'sharp'





// Local imports
import * as API from 'helpers/API'





async function getItemBlurhash(itemID) {
	const imagePath = path.resolve(process.cwd(), 'public', 'images', 'items', `${itemID}.png`)
	const imageBuffer = await fs.readFile(imagePath)
	const modifiedImageBuffer = await sharp(imageBuffer)
		.raw()
		.ensureAlpha()
		.resize(10, 10)
		.toBuffer()

	return encodeBlurhash(new Uint8ClampedArray(modifiedImageBuffer), 10, 10, 4, 4)
}

export async function getItemsProps() {
	const {
		data: { items },
	} = await API.getUniteHeldItems()

	await Promise.all(Object.keys(items).map(async itemID => {
		const blurDataURL = await getItemBlurhash(itemID)
		items[itemID].blurDataURL = blurDataURL
		items[itemID].id = itemID
	}))

	return {
		props: { items },
	}
}
