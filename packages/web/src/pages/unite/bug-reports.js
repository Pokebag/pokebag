// Local imports
import { BugReport } from 'components/Unite/BugReport'
import { Layout } from 'components/Unite/Layout'
import { PageHeader } from 'components/PageHeader'
import { useBreadcrumbs } from 'hooks/useBreadcrumbs'





function mapBugReports(report) {
	return (
		<BugReport
			report={report}
			key={report.id} />
	)
}

export default function BugReportsPage(props) {
	const { bugReports } = props

	useBreadcrumbs([
		{
			label: 'Pokémon UNITE',
			url: '/unite',
		},
		{
			label: 'Bug Reports',
			url: '/bug-reports',
		},
	])

	return (
		<Layout
			description=""
			title="Bug Report">
			<PageHeader>
				<h2 className="title">
					{'Bug Reports'}
				</h2>
			</PageHeader>

			{Object.values(bugReports).map(mapBugReports)}
		</Layout>
	)
}

export async function getServerSideProps(context) {
	const [
		{ firestore },
	] = await Promise.all([
		import('helpers/firebase.admin'),
	])

	const bugReports = {}
	const users = {}
	const [
		bugReportsSnapshot,
	] = await Promise.all([
		firestore
			.collection('bug-reports')
			.where('isAcknowledged', '==', false)
			.get(),
	])

	// Parse bug reports
	bugReportsSnapshot.forEach(bugReportSnapshot => {
		const bugReportData = bugReportSnapshot.data()

		bugReportData.createdAt = bugReportData.createdAt.toDate().toISOString()
		bugReportData.id = bugReportSnapshot.id

		if (!users[bugReportData.authorID]) {
			users[bugReportData.authorID] = [bugReportData]
		} else {
			users[bugReportData.authorID].push(bugReportData)
		}

		bugReports[bugReportSnapshot.id] = bugReportData
	})

	// Parse users
	await Promise.all(Object.entries(users).map(async ([userID, targets]) => {
		const userSnapshot = await firestore
			.collection('profiles')
			.doc(userID)
			.get()

		const userData = userSnapshot.data()

		userData.id = userSnapshot.id

		targets.forEach(item => {
			item.author = userData
		})
	}))

	return {
		props: { bugReports },
	}
}
