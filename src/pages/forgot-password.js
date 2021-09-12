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





export default function ForgotPasswordPage () {
	const [isRequestingReset, setIsRequestingReset] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)

	const handleSubmit = useCallback(async (formState, actions) => {
		const { updateValidity } = actions
		const { values } = formState

		setIsRequestingReset(true)

		try {
			await auth.sendPasswordResetEmail(values.email)

			setIsSuccess(true)
		} catch (error) {
			switch (error?.code) {
				case 'auth/invalid-email':
					updateValidity('email', ['Invalid email.'])
					break

				default:
					console.log(error)
			}
		}

		setIsRequestingReset(false)
	}, [setIsRequestingReset])

	return (
		<BaseLayout
			description="Forgot Password"
			title="Forgot Password">
			<section className="section">
				<div className="columns container">
					<Form
						className="box column is-half is-offset-one-quarter section"
						initialValues={{ email: '' }}
						isDisabled={isRequestingReset}
						onSubmit={handleSubmit}>
						<h2 className="title">{'Forgot Password'}</h2>

						<Field
							helperText="We'll send a password reset link to this email address if it exists."
							id="email">
							<Input
								id="email"
								isRequired
								type="email" />
						</Field>

						<div className="columns is-vcentered">
							<div className="column">
								{isSuccess && (
									<span className="has-text-success">{'Success! Check your email for further instructions.'}</span>
								)}
							</div>

							<div className="column has-text-right is-narrow">
								<FormButton
									className={classnames({
										'is-loading': isRequestingReset,
										'is-primary': true,
									})}
									type="submit">
									{'Request password reset'}
								</FormButton>
							</div>
						</div>
					</Form>
				</div>
			</section>
		</BaseLayout>
	)
}
