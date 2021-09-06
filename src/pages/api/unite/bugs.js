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
		reportID,
		status,
		title,
	} = request.body
	const { firebaseAuthToken } = request.cookies

	if (request.method === 'GET') {
		try {
			const bugReports = {}
			const bugs = {}
			const users = {}

			const [
				bugsSnapshot,
				bugReportsSnapshot,
			] = await Promise.all([
				firestore
					.collection('bugs')
					.get(),
				firestore
					.collection('bug-reports')
					.where('isAcknowledged', '==', true)
					.get(),
			])

			bugReportsSnapshot.forEach(bugReportSnapshot => {
				const bugReportSnapshotData = bugReportSnapshot.data()

				bugReportSnapshotData.createdAt = bugReportSnapshotData.createdAt.toDate().toISOString()
				bugReports[bugReportSnapshot.id] = {
					...bugReportSnapshotData,
					id: bugReportSnapshot.id,
				}

				if (!users[bugReportSnapshotData.authorID]) {
					users[bugReportSnapshotData.authorID] = {
						bugReports: [],
						bugs: [],
					}
				}

				users[bugReportSnapshotData.authorID].bugReports.push(bugReportSnapshot.id)
			})

			bugsSnapshot.forEach(bugSnapshot => {
				const bugSnapshotData = bugSnapshot.data()

				bugSnapshotData.createdAt = bugSnapshotData.createdAt.toDate().toISOString()
				bugSnapshotData.reports = bugSnapshotData.reportIDs.map(reportID => {
					return bugReports[reportID]
				})

				bugs[bugSnapshot.id] = {
					...bugSnapshotData,
					id: bugSnapshot.id,
				}

				if (!users[bugSnapshotData.authorID]) {
					users[bugSnapshotData.authorID] = {
						bugReports: [],
						bugs: [],
					}
				}

				users[bugSnapshotData.authorID].bugs.push(bugSnapshot.id)
			})

			await Promise.all(Object.entries(users).map(async ([userID, targets]) => {
				const profileSnapshot = await firestore
					.collection('profiles')
					.doc(userID)
					.get()

				const user = {
					...profileSnapshot.data(),
					id: profileSnapshot.id,
				}

				targets.bugs.forEach(bugID => {
					bugs[bugID].author = user
				})

				targets.bugReports.forEach(bugReportID => {
					bugReports[bugReportID].author = user
				})
			}))

			response.status(httpStatus.OK).json({
				data: { bugs },
			})
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
				.collection('bugs')
				.add({
					authorID: user.uid,
					createdAt: firebase.firestore.FieldValue.serverTimestamp(),
					description,
					entityID,
					entityType,
					reportIDs: [reportID],
					status,
					title,
				})

			await firestore
				.collection('bug-reports')
				.doc(reportID)
				.update({
					bugID: id,
					isAcknowledged: true,
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
