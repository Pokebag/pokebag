// Module imports
import {
	useEffect,
	useState,
} from 'react'
import { useRouter } from 'next/router'





// Local imports
import { BugReport } from 'components/Unite/BugReport'
import { Layout } from 'components/Unite/Layout'
import { useBreadcrumbs } from 'hooks/useBreadcrumbs'





export default function BugReportPage(props) {
	const {
		items,
		pokemon,
	} = props
	const Router = useRouter()
	const [bugReport, setBugReport] = useState(null)
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

	useEffect(async () => {
		if (reportID && !bugReport) {
			const response = await fetch(`/api/unite/bug-reports/${reportID}`)
			const responseJSON = await response.json()
			setBugReport(responseJSON)
		}
	}, [
		reportID,
		setBugReport,
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

export async function getStaticPaths() {
	const [
		{ firestore },
	]= await Promise.all([
		import('helpers/firebase.admin')
	])
	const paths = []

	const bugReportsSnapshot = await firestore
		.collection('bug-reports')
		.get()

	bugReportsSnapshot.forEach(bugReportSnapshot => {
		paths.push({
			params: {
				reportID: bugReportSnapshot.id,
			 },
		})
	})

	return {
		fallback: 'blocking',
		paths,
	}
}

export async function getStaticProps(context) {
	const [
		{ getHeldItemsProps },
		{ getPokemonProps },
	] = await Promise.all([
		import('helpers/getHeldItemsProps'),
		import('helpers/getPokemonProps'),
	])

	const [
		{ props: heldItemsProps },
		{ props: pokemonProps },
	] = await Promise.all([
		getHeldItemsProps(context),
		getPokemonProps(context),
	])

	return {
		props: {
			...heldItemsProps,
			...pokemonProps,
		},
		revalidate: 3600,
	}
}
