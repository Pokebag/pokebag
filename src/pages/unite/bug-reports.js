// Module imports
import { useMemo } from 'react'





// Local imports
import { BugReport } from 'components/Unite/BugReport'
import { Layout } from 'components/Unite/Layout'
import { PageHeader } from 'components/PageHeader'
import { RequireAuth } from 'components/RequireAuth'
import { RequirePermissions } from 'components/RequirePermissions'
import { useBreadcrumbs } from 'hooks/useBreadcrumbs'
import { useFirestoreCollection } from 'hooks/useFirestoreCollection'





function mapBugReports(report) {
	return (
		<BugReport
			report={report}
			key={report.id} />
	)
}

export default function BugReportsPage() {
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

	const baseBugReports = useFirestoreCollection(useMemo(() => ({
		collectionName: 'bug-reports',
		queries: [
			['where', 'isAcknowledged', '==', false],
			['where', 'isIgnored', '==', false],
		],
	}), []))

	const userProfileCollectionOptions = useMemo(() => ({
		collectionName: 'profiles',
		documentIDs: Object.values(baseBugReports ?? {}).map(({ authorID }) => authorID),
	}), [baseBugReports])

	const userProfiles = useFirestoreCollection(userProfileCollectionOptions, [userProfileCollectionOptions])

	const bugReports = useMemo(() => {
		if (!baseBugReports || !userProfiles) {
			return []
		}

		return Object.values(baseBugReports).reduce((accumulator, bugReport) => {
			const userProfile = userProfiles[bugReport.authorID]
			if (userProfile) {
				accumulator.push({
					...bugReport,
					author: userProfile,
					createdAt: bugReport.createdAt.toMillis(),
				})
			}
			return accumulator
		}, [])
	}, [
		baseBugReports,
		userProfiles,
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

			<RequireAuth
				verifyingComponent={(
					<section className="box section">
						Verifying auth state...
					</section>
				)}>
				<RequirePermissions
					notPermittedComponent={(
						<section className="box section">
							{'Sorry, you\'re not allowed to be here. 🤷‍♂️'}
						</section>
					)}
					permissions={['isModerator']}
					verifyingComponent={(
						<section className="box section">
							{'Verifying permissions...'}
						</section>
					)}>
					{(bugReports === null) && (
						<section className="box section">
							{'Loading bug reports...'}
						</section>
					)}

					{(bugReports?.length === 0) && (
						<section className="box section">
							{'No bug reports found.'}
						</section>
					)}

					{(bugReports?.length > 0) && Object.values(bugReports).map(mapBugReports)}
				</RequirePermissions>
			</RequireAuth>
		</Layout>
	)
}
