// Local imports
import {
	auth,
	firebase,
	firestore,
} from 'helpers/firebase.admin'
import { createEndpoint } from 'helpers/createEndpoint'
import httpStatus from 'helpers/httpStatus'





export const handler = async (request, response) => {
	const {
		description,
		entityID,
		entityType,
		stepsToReproduce,
	} = request.body
	const { firebaseAuthToken } = request.cookies

	try {
		const user = await auth.verifyIdToken(firebaseAuthToken, true)

		const { id } = await firestore
			.collection('bug-reports')
			.add({
				authorID: user.uid,
				createdAt: firebase.firestore.FieldValue.serverTimestamp(),
				description,
				entityID,
				entityType,
				isAcknowledged: false,
				isIgnored: false,
				stepsToReproduce,
			})

		response.status(httpStatus.OK).json({ id })
	} catch (error) {
		console.log(error.errorInfo.code)

		switch (error.errorInfo.code) {
			case 'auth/email-already-exists':
				response.status(httpStatus.FORBIDDEN).json({
					errors: [error.errorInfo.code]
				})
				break

			case 'auth/invalid-password':
				response.status(httpStatus.UNPROCESSABLE_ENTITY).json({
					errors: [error.errorInfo.code]
				})
				break

			default:
				response.status(httpStatus.INTERNAL_SERVER_ERROR).json({
					errors: [error.errorInfo.code],
				})
		}
	}
}





export default createEndpoint({
	allowedMethods: [
		'get',
		'post',
	],
	handler,
})
