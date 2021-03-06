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

export async function getHeldItemsProps() {
	const {
		data: { items },
	} = await API.getUniteHeldItems()

	await Promise.all(Object.values(items).map(async item => {
		item.blurDataURL = await getItemBlurhash(item.id)
		item.imageURL = `/images/items/${item.id}.png`
	}))

	return {
		props: { items },
	}
}
