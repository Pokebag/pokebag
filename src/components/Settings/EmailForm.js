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





export function EmailForm() {
	const {
		user,
		validateEmail,
	} = useAuth()
	const formRef = useRef(null)

	const [isReauthenticationModalOpen, setIsReauthenticationModalOpen] = useState(true)
	const [isReauthenticated, setIsReauthenticated] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)

	const initialValues = useMemo(() => {
		return {
			email: user?.email
		}
	}, [user?.email])

	const resetIsSuccess = useCallback(() => setIsSuccess(false), [setIsSuccess])

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
			await user.updateEmail(formState.values.email)

			setIsSuccess(true)
			setTimeout(resetIsSuccess, 10000)
		} catch (error) {
			if (error.code === 'auth/requires-recent-login') {
				setIsReauthenticationModalOpen(true)
			}

			console.log(error)
		}

		setIsSubmitting(false)
	}, [
		resetIsSuccess,
		setIsReauthenticationModalOpen,
		setIsSubmitting,
		user,
	])

	const onValidate = useCallback(async value => {
		if (value === user.email) {
			return null
		}

		const emailIsAvailable = await validateEmail(value)

		if (emailIsAvailable) {
			return null
		}

		return 'Email is already in use'
	}, [
		user?.email,
		validateEmail,
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
					{'Change your email'}
				</h3>

				<Form
					initialValues={initialValues}
					isDisabled={isSubmitting}
					onSubmit={onSubmit}
					ref={formRef}>
					<Field
						helperText={(
							<>Your current email is <strong>{user.email}</strong>.</>
						)}
						id="email"
						label="New Email">
						<Input
							id="email"
							isRequired
							type="email"
							validate={onValidate} />
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
