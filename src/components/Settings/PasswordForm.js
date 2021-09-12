// Module imports
import {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'
import classnames from 'classnames'





// Local imports
import { Field } from 'components/Forms/Field'
import { Form } from 'components/Forms/Form'
import { FormButton } from 'components/Forms/FormButton'
import { Input } from 'components/Forms/Input'
import { ReauthenticateModal } from 'components/ReauthenticateModal'
import { useAuth } from 'contexts/AuthContext'





export function PasswordForm() {
	const { user } = useAuth()
	const formRef = useRef(null)

	const [isReauthenticationModalOpen, setIsReauthenticationModalOpen] = useState(false)
	const [isReauthenticated, setIsReauthenticated] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)

	const resetIsSuccess = useCallback(() => setIsSuccess(false), [setIsSuccess])

	const onVerifyNewPasswordValidate = useCallback((value, allValues) => {
		if (value !== allValues['new-password']) {
			return 'Passwords do not match'
		}
	}, [])

	const onReauthenticationModalClose = useCallback(() => {
		setIsReauthenticationModalOpen(false)
	}, [setIsReauthenticationModalOpen])

	const onReauthenticationSuccess = useCallback(() => {
		setIsReauthenticated(true)
		setIsReauthenticationModalOpen(false)
	}, [
		setIsReauthenticated,
		setIsReauthenticationModalOpen,
	])

	const onSubmit = useCallback(async formState => {
		setIsSubmitting(true)

		try {
			await user.updatePassword(formState.values['new-password'])

			setIsSuccess(true)
			setTimeout(resetIsSuccess, 10000)
		} catch (error) {
			if (error.code === 'auth/requires-recent-login') {
				setIsReauthenticationModalOpen(true)
			}
		}

		setIsSubmitting(false)
	}, [
		resetIsSuccess,
		setIsReauthenticationModalOpen,
		setIsSubmitting,
		user,
	])

	useEffect(() => {
		if (isReauthenticated) {
			formRef.current.submit()
		}
	}, [isReauthenticated])

	return (
		<>
			<section className="box section">
				<h3 className="title is-4">
					{'Change your password'}
				</h3>

				<Form
					initialValues={{
						'new-password': '',
						'verify-new-password': '',
					}}
					isDisabled={isSubmitting}
					onSubmit={onSubmit}
					ref={formRef}>
					<Field
						id="new-password"
						label="New Password">
						<Input
							id="new-password"
							isRequired
							minLength={6}
							type="password" />
					</Field>

					<Field
						id="verify-new-password"
						label="New Password (again)">
						<Input
							id="verify-new-password"
							isRequired
							minLength={6}
							type="password"
							validate={onVerifyNewPasswordValidate} />
					</Field>

					<div className="columns is-vcentered">
						<div className="column">
							{isSuccess && (
								<span className="has-text-success">
									{'Saved!'}
								</span>
							)}
						</div>

						<div className="column has-text-right">
							<FormButton
								className={classnames({
									'is-loading': isSubmitting,
									'is-primary': true,
								})}
								type="submit">
								{'Save'}
							</FormButton>
						</div>
					</div>
				</Form>
			</section>

			{isReauthenticationModalOpen && (
				<ReauthenticateModal
					onClose={onReauthenticationModalClose}
					onSuccess={onReauthenticationSuccess} />
			)}
		</>
	)
}
