// Module imports
import {
	useCallback,
	useState,
} from 'react'
import classnames from 'classnames'





// Local imports
import { auth } from 'helpers/firebase'
import { BaseLayout } from 'components/BaseLayout'
import { Form } from 'components/Forms/Form'
import { Field } from 'components/Forms/Field'
import { Input } from 'components/Forms/Input'
import { FormButton } from 'components/Forms/FormButton'





export default function ResetPasswordPage () {
	const [isResetting, setIsResetting] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)

	const resetSuccess = useCallback(() => {
		setIsSuccess(false)
	}, [setIsSuccess])

	const handleSubmit = useCallback(async (formState, actions) => {
		const { updateValidity } = actions
		const { values } = formState

		setIsResetting(true)

		try {
			await auth.sendPasswordResetEmail(values.email)

			setIsSuccess(true)
			setTimeout(resetSuccess, 10000)
		} catch (error) {
			switch (error?.code) {
				case 'auth/invalid-email':
					updateValidity('email', ['Invalid email.'])
					break

				default:
					console.log(error)
			}
		}

		setIsResetting(false)
	}, [
		resetSuccess,
		setIsResetting,
	])

	return (
		<BaseLayout
			description="Reset Password"
			title="Reset Password">
			<section className="section">
				<div className="columns container">
					<Form
						className="box column is-half is-offset-one-quarter section"
						initialValues={{ email: '' }}
						isDisabled={isResetting}
						onSubmit={handleSubmit}>
						<h2 className="title">{'Reset Password'}</h2>

						<Field
							helperText="We'll send a password reset link to this email address if we find an associated account."
							id="email">
							<Input
								id="email"
								isRequired
								type="email" />
						</Field>

						<div className="columns is-vcentered">
							<div className="column">
								{isSuccess && (
									<span className="has-text-success">{'Success!'}</span>
								)}
							</div>

							<div className="column has-text-right is-narrow">
								<FormButton
									className={classnames({
										'is-loading': isResetting,
										'is-primary': true,
									})}
									type="submit">
									{'Reset password'}
								</FormButton>
							</div>
						</div>
					</Form>
				</div>
			</section>
		</BaseLayout>
	)
}
