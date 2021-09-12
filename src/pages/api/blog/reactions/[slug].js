// Local imports
import { createEndpoint } from 'helpers/createEndpoint'
import { database } from 'helpers/firebase.admin'
import httpStatus from 'helpers/httpStatus'





export const handler = async (request, response) => {
	const { emoji } = request.body
	const { slug } = request.query

	console.log('BEFORE')

	try {
		await database
			.ref(`article-reactions/${slug}/${emoji}`)
			.transaction(previousValue => {
				return previousValue + 1
			})
	} catch(error) {
		console.log(error)
	}

	console.log('AFTER')

	response.status(httpStatus.OK).end()
}





export default createEndpoint({
	allowedMethods: ['post'],
	handler,
})
