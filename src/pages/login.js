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





export default function LoginPage() {
	const Router = useRouter()
	const {
		isLoggingIn,
		isLoggedIn,
		login,
	} = useAuth()

	const handleSubmit = useCallback(formData => {
		login(formData.values.email, formData.values.password)
	}, [login])

	useEffect(() => {
		if (isLoggedIn) {
			const url = new URL(location.href)
			const destination = url.searchParams.get('destination')
			Router.push(destination ?? '/')
		}
	}, [isLoggedIn])

	return (
		<BaseLayout>
			<section className="section">
				<div className="columns container">
					<Form
						className="box column is-half is-offset-one-quarter section"
						initialValues={{
							email: '',
							password: '',
						}}
						onSubmit={handleSubmit}>
						<h2 className="title">Login</h2>

						<Field
							id="email"
							label="Email"
							isRequired>
							<Input
								id="email"
								type="email" />
						</Field>

						<Field
							id="password"
							label="Password"
							isRequired>
							<Input
								id="password"
								type="password" />
						</Field>

						<div className="columns">
							<div className="column has-text-left">
								{isLoggingIn && 'Logging in...'}
								{isLoggedIn && 'Redirecting...'}
							</div>

							<div className="column has-text-right">
								<div className="field is-grouped">
									<Link href="/sign-up">
										<a
											className="button is-ghost mr-2"
											disabled={isLoggingIn || isLoggedIn}>
											Create an account
										</a>
									</Link>

									<FormButton
										className={classnames({
											'is-primary': true,
											'is-loading': isLoggingIn || isLoggedIn,
										})}
										isDisabled={isLoggingIn || isLoggedIn}
										type="submit">
										Login
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
