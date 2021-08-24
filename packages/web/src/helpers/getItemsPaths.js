// Local imports
import * as API from 'helpers/API'





export async function getItemsPaths() {
	const {
		data: { items },
	} = await API.getUniteHeldItems()

	return {
		fallback: false,
		paths: Object.keys(items).map(itemID => ({
			params: { itemID },
		})),
	}
}
