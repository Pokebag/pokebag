// Local imports
import {
	auth,
	firestore,
} from 'helpers/firebase.admin'
import { createEndpoint } from 'helpers/createEndpoint'
import httpStatus from 'helpers/httpStatus'





export const handler = async (request, response) => {
	const {
		email,
		password,
		username,
	} = request.body

	try {
		const collectionSnapshot = await firestore
			.collection('profiles')
			.where('username', '==', 'username')
			.get()

		const matchingUserProfiles = []

		collectionSnapshot.forEach(documentSnapshot => {
			matchingUserProfiles.push(documentSnapshot.data())
		})

		if (matchingUserProfiles.length) {
			throw {
				errorInfo: {
					code: 'auth/username-already-exists',
				},
			}
		}

		const user = await auth.createUser({
			disabled: false,
			displayName: username,
			email,
			emailVerified: false,
			password,
		})

		const {
			metadata,
			uid,
		} = user

		await Promise.all([
			firestore
				.collection('profiles')
				.doc(uid)
				.set({
					avatarURL: `https://avatars.dicebear.com/api/bottts/username.svg`,
					createdAt: new Date(metadata.creationTime),
					username,
				}),

			firestore
				.collection('settings')
				.doc(uid)
				.set({
					isAdmin: false,
					isModerator: false,
					theme: 'system',
				}),

			firestore
				.collection('activity-feeds')
				.doc(uid)
				.collection('items')
				.add({
					createdAt: new Date(metadata.creationTime),
					type: 'create-account',
				}),
		])

		response.status(httpStatus.CREATED).end()
	} catch (error) {
		console.log(error.errorInfo.code)

		switch (error.errorInfo.code) {
			case 'auth/email-already-exists':
				response.status(httpStatus.FORBIDDEN).json({
					errors: [error.errorInfo.code]
				})
				break

			case 'auth/username-already-exists':
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
	allowedMethods: ['post'],
	handler,
})
