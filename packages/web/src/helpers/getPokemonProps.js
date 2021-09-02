// Module imports
import { encode as encodeBlurhash } from 'blurhash'
import fs from 'fs/promises'
import path from 'path'
import sharp from 'sharp'





// Local imports
import * as API from 'helpers/API'





async function getItemBlurhash(itemID) {
	const imagePath = path.resolve(process.cwd(), 'public', 'images', 'games', 'unite', 'pokemon', `${itemID}.png`)
	const imageBuffer = await fs.readFile(imagePath)
	const modifiedImageBuffer = await sharp(imageBuffer)
		.raw()
		.ensureAlpha()
		.resize(10, 10)
		.toBuffer()

	return encodeBlurhash(new Uint8ClampedArray(modifiedImageBuffer), 10, 10, 4, 4)
}

export async function getPokemonProps() {
	const {
		data: { pokemon },
	} = await API.getUnitePokemon()

	await Promise.all(Object.values(pokemon).map(async currentPokemon => {
		const blurDataURL = await getItemBlurhash(currentPokemon.id)
		currentPokemon.blurDataURL = blurDataURL
		currentPokemon.id = currentPokemon.id
		currentPokemon.imageURL = `/images/games/unite/pokemon/${currentPokemon.id}.png`
	}))

	return {
		props: { pokemon },
	}
}
