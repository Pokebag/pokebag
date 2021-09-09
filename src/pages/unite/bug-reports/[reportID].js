// Module imports
import { useRouter } from 'next/router'





// Local imports
import { BugReport } from 'components/Unite/BugReport'
import { Layout } from 'components/Unite/Layout'
import { RequireAuth } from 'components/RequireAuth'
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
			<RequireAuth isDisabled={bugReport?.isAcknowledged}>
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
			</RequireAuth>
		</Layout>
	)
}

export async function getServerSideProps(context) {
	const [
		{
			auth,
			firestore,
		},
		{ default: nookies },
	]= await Promise.all([
		import('helpers/firebase.admin'),
		import('nookies'),
	])

	const { reportID } = context.params

	const bugReportSnapshot = await firestore
		.collection('bug-reports')
		.doc(reportID)
		.get()

	const bugReport = bugReportSnapshot.data()

	if (!bugReport.isAcknowledged) {
		const { firebaseAuthToken } = nookies.get(context)
		let settings = null
		let user = null

		if (firebaseAuthToken) {
			user = await auth.verifyIdToken(firebaseAuthToken, true)
		}

		if (user) {
			settings = await firestore
				.collection('settings')
				.doc(user.uid)
				.get()
			settings = settings.data()
		}

		if (!user || !settings.isModerator) {
			return {
				props: {},
			}
		}
	}

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
