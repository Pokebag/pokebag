// Module imports
import { useCallback } from 'react'
import { useRouter } from 'next/router'
import shallow from 'zustand/shallow'





// Local imports
import { Button } from 'components/Button'
import { EntitySelect } from 'components/Unite/EntitySelect'
import { Field } from 'components/Forms/Field'
import { Form } from 'components/Forms/Form'
import { FormButton } from 'components/Forms/FormButton'
import { Hidden } from 'components/Forms/Hidden'
import { Input } from 'components/Forms/Input'
import { Modal } from 'components/Modal'
import { Select } from 'components/Forms/Select'
import { useStore } from 'hooks/useStore'
import classNames from 'classnames'





export function ConvertBugReportToBugModal(props) {
	const Router = useRouter()
	const {
		onClose,
		report,
	} = props
	const {
		isSavingBug,
		saveBug,
	} = useStore(state => ({
		isSavingBug: state.unite.isSavingBug,
		saveBug: state.unite.saveBug,
	}), shallow)

	const handleSubmit = useCallback(async ({ values }) => {
		const bugID = await saveBug(values)
		Router.push(`/unite/known-bugs/${bugID}`)
	}, [])

	return (
		<Modal
			onClose={onClose}
			showClose={false}>
			<div className="modal-card">
				<Form
					initialValues={{
						description: report.description,
						entityID: report.entityID,
						entityType: report.entityType,
						reportID: report.id,
						status: 'active',
						title: '',
					}}
					onSubmit={handleSubmit}>
					<header className="modal-card-head">
						<p className="modal-card-title">Modal title</p>
					</header>

					<section className="modal-card-body">
						<Field
							id="title"
							label="What should we call this bug?">
							<Input
								id="title"
								isDisabled={isSavingBug}
								isRequired />
						</Field>

						<EntitySelect
							isDisabled={isSavingBug}
							label="What is this bug related to?"
							isRequired />

						<Field
							id="description"
							label="How would you describe this bug?">
							<Input
								id="description"
								isDisabled={isSavingBug}
								isMultiline
								isRequired />
						</Field>

						<Field
							id="status"
							label="What's the status of this bug?">
							<Select
								id="status"
								isDisabled={isSavingBug}
								isRequired
								isUp
								options={[
									{
										label: 'Active',
										value: 'active',
									},
									{
										label: 'Resolved',
										value: 'resolved',
									},
								]} />
						</Field>

						<Hidden id="reportID" />
					</section>

					<footer className="modal-card-foot is-justify-content-space-between">
						<FormButton
							className={classNames({
								'is-success': true,
								'is-loading': isSavingBug,
							})}
							style={{ order: '2' }}
							type="submit">
							Save changes
						</FormButton>

						<Button
							onClick={onClose}
							style={{ order: '1' }}>
							Cancel
						</Button>
					</footer>
				</Form>
			</div>
		</Modal>
	)
}
