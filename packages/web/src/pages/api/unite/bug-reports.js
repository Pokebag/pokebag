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

	if (request.method === 'GET') {
		try {
			const bugReports = []
			const users = {}

			const bugReportsSnapshot = await firestore
				.collection('bug-reports')
				.get()

			bugReportsSnapshot.forEach(bugReport => {
				const bugReportData = bugReport.data()
				users[bugReportData.authorID] = null

				bugReports.push({
					...bugReportData,
					createdAt: bugReportData.createdAt.toDate().toISOString(),
					id: bugReport.id,
				})
			})

			await Promise.all(Object.keys(users).map(async userID => {
				const profileSnapshot = await firestore
					.collection('profiles')
					.doc(userID)
					.get()

				users[userID] = {
					...profileSnapshot.data(),
					id: userID,
				}
			}))

			bugReports.forEach(report => {
				report.author = users[report.authorID]
				return report
			})

			response.status(httpStatus.OK).json({ bugReports })
		} catch(error) {
			console.log(error)
			response.status(httpStatus.INTERNAL_SERVER_ERROR).json({
				errors: [error.errorInfo.code],
			})
		}
	} else {
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
}





export default createEndpoint({
	allowedMethods: [
		'get',
		'post',
	],
	handler,
})
