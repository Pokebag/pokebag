// Local imports
import { Bug } from 'components/Unite/Bug'
import { Layout } from 'components/Unite/Layout'
import { PageHeader } from 'components/PageHeader'
import { useBreadcrumbs } from 'hooks/useBreadcrumbs'





function mapBugs(bug) {
	return (
		<Bug
			bug={bug}
			key={bug.id} />
	)
}

export default function KnownBugsPage(props) {
	const { bugs } = props

	useBreadcrumbs([
		{
			label: 'Pokémon UNITE',
			url: '/unite',
		},
		{
			label: 'Known Bugs',
			url: '/known-bugs',
		},
	])

	return (
		<Layout
			description="This page documents all of the Pokémon UNITE bugs known to Pokébag, as well as their status!"
			title="Known Bugs">
			<PageHeader>
				<h2 className="title">
					{'Known Bugs'}
				</h2>
			</PageHeader>

			{Object.values(bugs).map(mapBugs)}
		</Layout>
	)
}

export async function getServerSideProps(context) {
	const [
		{ firestore },
	] = await Promise.all([
		import('helpers/firebase.admin'),
	])

	const bugs = {}
	const bugReports = {}
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

	// Parse bugs
	bugsSnapshot.forEach(bugSnapshot => {
		const bugData = bugSnapshot.data()

		bugData.createdAt = bugData.createdAt.toDate().toISOString()
		bugData.id = bugSnapshot.id
		bugData.reports = bugData.reportIDs.map(reportID => {
			return bugReports[reportID]
		})

		if (!users[bugData.authorID]) {
			users[bugData.authorID] = [bugData]
		} else {
			users[bugData.authorID].push(bugData)
		}

		bugs[bugSnapshot.id] = bugData
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
		props: { bugs },
	}
}
