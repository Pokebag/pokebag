// Local imports
import {
	auth,
	firebase,
	firestore,
} from 'helpers/firebase.admin'
import { createEndpoint } from 'helpers/createEndpoint'
import httpStatus from 'helpers/httpStatus'





export const handler = async (request, response) => {
	const { reportID } = request.query
	const { firebaseAuthToken } = request.cookies

	try {
		const bugReportSnapshot = await firestore
			.collection('bug-reports')
			.doc(reportID)
			.get()

		const bugReport = bugReportSnapshot.data()

		bugReport.createdAt = bugReport.createdAt.toDate().toISOString()
		bugReport.id = bugReportSnapshot.id

		const profileSnapshot = await firestore
			.collection('profiles')
			.doc(bugReport.authorID)
			.get()

		bugReport.author = {
			...profileSnapshot.data(),
			id: profileSnapshot.id,
		}

		response.status(httpStatus.OK).json(bugReport)
	} catch(error) {
		console.log(error)
		response.status(httpStatus.INTERNAL_SERVER_ERROR).json({
			errors: [error.errorInfo.code],
		})
	}
}





export default createEndpoint({
	allowedMethods: ['get'],
	handler,
})
