// Module imports
import {
	useCallback,
	useEffect,
} from 'react'
import { useRouter } from 'next/router'
import classnames from 'classnames'
import Link from 'next/link'





// Local imports
import { BaseLayout } from 'components/BaseLayout'
import { Field } from 'components/Forms/Field'
import { Form } from 'components/Forms/Form'
import { FormButton } from 'components/Forms/FormButton'
import { Input } from 'components/Forms/Input'
import { useAuth } from 'contexts/AuthContext'





function handleError(error, updateValidity) {
	switch (error?.code) {
		case 'auth/email-already-exists':
			updateValidity('email', ['An account already exists with this email address'])
			break

		case 'auth/invalid-password':
			updateValidity('password', ['Invalid password; passwords must be at least 6 characters'])
			break

		case 'auth/username-already-exists':
			updateValidity('username', ['An account already exists with this username'])
			break

		default:
			console.log(error)
	}}

export default function SignUpPage() {
	const Router = useRouter()
	const {
		isLoggedIn,
		isLoggingIn,
		isRegistered,
		isRegistering,
		register,
	} = useAuth()

	const handleSubmit = useCallback(async (formData, actions) => {
		const { values } = formData
		const { updateValidity } = actions

		try {
			await register(values)
		} catch (error) {
			if (error.errors) {
				error.errors.forEach(errorCode => {
					handleError({ code: errorCode }, updateValidity)
				})
			} else {
				handleError(error, updateValidity)
			}
		}
	}, [register])

	useEffect(() => {
		if (isRegistered && isLoggedIn) {
			Router.push('/')
		}
	}, [
		isLoggedIn,
		isRegistered,
	])

	return (
		<BaseLayout>
			<section className="section">
				<div className="columns container">
					<Form
						className="box column is-half is-offset-one-quarter section"
						initialValues={{
							username: '',
							email: '',
							password: '',
						}}
						onSubmit={handleSubmit}>
						<h2 className="title">Create an Account</h2>

						<Field
							id="username"
							label="Username"
							isRequired>
							<Input
								id="username"
								isDisabled={isRegistering || isRegistered} />
						</Field>

						<Field
							id="email"
							label="Email"
							isRequired>
							<Input
								id="email"
								isDisabled={isRegistering || isRegistered}
								type="email" />
						</Field>

						<Field
							id="password"
							label="Password"
							isRequired>
							<Input
								id="password"
								isDisabled={isRegistering || isRegistered}
								minLength={6}
								type="password" />
						</Field>

						<div className="columns">
							<div className="column has-text-left">
								{isRegistering && 'Creating account...'}
								{isLoggingIn && 'Logging in...'}
								{isLoggedIn && 'Redirecting...'}
							</div>

							<div className="column has-text-right">
								<div className="field is-grouped">
									<Link href="/login">
										<a
											className="button is-ghost mr-2"
											disabled={isRegistering || isRegistered}>
											Already have an account?
										</a>
									</Link>

									<FormButton
										className={classnames({
											'is-primary': true,
											'is-loading': isRegistering || isRegistered,
										})}
										isDisabled={isRegistering || isRegistered}
										type="submit">
										Create Account
									</FormButton>
								</div>
							</div>
						</div>
					</Form>
				</div>
			</section>
		</BaseLayout>
	)
}
