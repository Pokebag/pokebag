// Module imports
import {
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react'





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
	const {
		items,
		pokemon,
	} = props
	const [bugReports, setBugReports] = useState(null)

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

	const dateFormatter = useMemo(() => {
		return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' })
	}, [])

	useEffect(async () => {
		const response = await fetch('/api/unite/bug-reports')
		const responseJSON = await response.json()

		setBugReports(responseJSON.bugReports)
	}, [
		dateFormatter,
		setBugReports,
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

			{Boolean(bugReports) && bugReports.map(mapBugReports)}

			{!bugReports && (
				<section className="box section">
					Loading bug reports...
				</section>
			)}
		</Layout>
	)
}
