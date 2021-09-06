// Module imports
import { useRouter } from 'next/router'





// Local imports
import { BugReport } from 'components/Unite/BugReport'
import { Layout } from 'components/Unite/Layout'
import { useBreadcrumbs } from 'hooks/useBreadcrumbs'





export default function BugReportPage(props) {
	const {
		bugReport,
		items,
		pokemon,
	} = props
	const Router = useRouter()
	const { reportID } = Router.query

	useBreadcrumbs([
		{
			label: 'Pokémon UNITE',
			url: '/unite',
		},
		{
			label: 'Bug Reports',
			url: '/unite/bug-reports',
		},
		{
			label: 'Report',
			url: `/unite/bug-reports/${reportID}`,
		},
	])

	return (
		<Layout
			description={bugReport ? `A bug report from ${bugReport.author.username}` : 'A bug report'}
			title="Bug Report">
			{!bugReport && (
				<section className="box section">
					Loading bug report...
				</section>
			)}

			{Boolean(bugReport) && (
				<BugReport
					items={items}
					pokemon={pokemon}
					report={bugReport} />
			)}
		</Layout>
	)
}

export async function getServerSideProps(context) {
	const [
		{ firestore },
	]= await Promise.all([
		import('helpers/firebase.admin')
	])

	const { reportID } = context.params

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

	return {
		props: { bugReport },
	}
}
