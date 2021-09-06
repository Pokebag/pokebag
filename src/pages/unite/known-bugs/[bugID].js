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

export default function KnownBugPage(props) {
	const { bug } = props

	useBreadcrumbs([
		{
			label: 'Pokémon UNITE',
			url: '/unite',
		},
		{
			label: 'Known Bugs',
			url: '/known-bugs',
		},
		{
			label: bug.title,
			url: `/${bug.id}`,
		},
	])

	return (
		<Layout
			description="This page describes a known bug in Pokémon UNITE"
			title="Known Bug">
			<PageHeader>
				<h2 className="title">
					{'Known Bug'}
				</h2>
			</PageHeader>

			<Bug bug={bug} />
		</Layout>
	)
}

export async function getServerSideProps(context) {
	const [
		{ firestore },
	] = await Promise.all([
		import('helpers/firebase.admin')
	])
	const { bugID } = context.params

	const bugReports = {}
	const users = {}

	const [
		bugSnapshot,
		bugReportsSnapshot,
	] = await Promise.all([
		firestore
			.collection('bugs')
			.doc(bugID)
			.get(),
		firestore
			.collection('bug-reports')
			.where('bugID', '==', bugID)
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
			}
		}

		users[bugReportSnapshotData.authorID].bugReports.push(bugReportSnapshot.id)
	})

	const bugSnapshotData = bugSnapshot.data()

	bugSnapshotData.createdAt = bugSnapshotData.createdAt.toDate().toISOString()
	bugSnapshotData.reports = bugSnapshotData.reportIDs.map(reportID => {
		return bugReports[reportID]
	})

	const bug = {
		...bugSnapshotData,
		id: bugSnapshot.id,
	}

	if (!users[bugSnapshotData.authorID]) {
		users[bugSnapshotData.authorID] = {
			bugReports: [],
		}
	}

	await Promise.all(Object.entries(users).map(async ([userID, targets]) => {
		const profileSnapshot = await firestore
			.collection('profiles')
			.doc(userID)
			.get()

		const user = {
			...profileSnapshot.data(),
			id: profileSnapshot.id,
		}

		if (bug.authorID === userID) {
			bug.author = user
		}

		targets.bugReports.forEach(bugReportID => {
			bugReports[bugReportID].author = user
		})
	}))

	return {
		props: { bug },
	}
}
