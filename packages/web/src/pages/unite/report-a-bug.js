// Module imports
import {
	useCallback,
	useState,
} from 'react'
import { useRouter } from 'next/router'





// Local imports
import { FormButton } from 'components/Forms/FormButton'
import { Form } from 'components/Forms/Form'
import { IDSelect } from 'components/Unite/ReportABug/IDSelect'
import { DescriptionInput } from 'components/Unite/ReportABug/DescriptionInput'
import { Layout } from 'components/Unite/Layout'
import { PageHeader } from 'components/PageHeader'
import { StepsToReproduceInput } from 'components/Unite/ReportABug/StepsToReproduceInput'
import { TypeSelect } from 'components/Unite/ReportABug/TypeSelect'
import { useBreadcrumbs } from 'hooks/useBreadcrumbs'
import classNames from 'classnames'





// Constants
const DESCRIPTION = 'Report a bug in Pokémon UNITE so that we can investigate, categorize, and publish it!'





export default function ReportABugPage(props) {
	const {
		items,
		pokemon,
	} = props
	const Router = useRouter()
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleSubmit = useCallback(async ({ values }) => {
		setIsSubmitting(true)

		try {
			const { id: reportID } = await fetch('/api/unite/bug-reports', {
				body: JSON.stringify({
					description: values.description,
					entityID: values['entity-id'],
					entityType: values['entity-type'],
					stepsToReproduce: values['steps-to-reproduce'],
				}),
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'post',
			}).then(response => response.json())

			Router.push(`/unite/bug-reports/${reportID}`)
		} catch(error) {
			console.log(error)
			setIsSubmitting(false)
		}
	}, [setIsSubmitting])

	useBreadcrumbs([
		{
			label: 'Pokémon UNITE',
			url: '/unite',
		},
		{
			label: 'Report a Bug',
			url: '/report-a-bug',
		},
	])

	return (
		<Layout
			description={DESCRIPTION}
			title="Report a Bug">
			<PageHeader>
				<h2 className="title">
					{'Report a Bug'}
				</h2>
				<p className="subtitle">{DESCRIPTION}</p>
			</PageHeader>

			<Form
				initialValues={{
					'description': '',
					'entity-id': null,
					'entity-type': null,
					'steps-to-reproduce': [],
				}}
				isDisabled={isSubmitting}
				onSubmit={handleSubmit}>
				<section className="box section">
					<div className="field is-horizontal">
						<div className="field-body">
							<TypeSelect />

							<IDSelect
								heldItems={items}
								pokemon={pokemon} />
						</div>
					</div>

					<DescriptionInput />

					<StepsToReproduceInput />

					<div className="field has-text-right">
						<FormButton
							className={classNames({
								'is-loading': isSubmitting,
								'is-primary': true,
							})}
							type="submit">
							Submit
						</FormButton>
					</div>
				</section>
			</Form>
		</Layout>
	)
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
		{ props: heldItemProps },
		{ props: pokemonProps },
	] = await Promise.all([
		getHeldItemsProps(context),
		getPokemonProps(context),
	])

	return {
		props: {
			...heldItemProps,
			...pokemonProps,
		},
	}
}
