// Module imports
import {
	useCallback,
	useEffect,
	useState,
} from 'react'
import { useRouter } from 'next/router'
import classnames from 'classnames'
import Link from 'next/link'





// Local imports
import { auth } from 'helpers/firebase'
import { BaseLayout } from 'components/BaseLayout'
import { Form } from 'components/Forms/Form'
import { Field } from 'components/Forms/Field'
import { Input } from 'components/Forms/Input'
import { FormButton } from 'components/Forms/FormButton'





function ErrorCode(props) {
	const { code } = props


	switch (code) {
		case 'auth/argument-error':
			return (
				<>{'Invalid reset code. Try '}<Link href="/forgot-password">{'requesting another reset'}</Link>{'.'}</>
			)

		case 'auth/expired-action-code':
			return (
				<>{'This password reset link has expired. Try '}<Link href="/forgot-password">{'requesting another reset'}</Link>{'.'}</>
			)

		case 'auth/invalid-action-code':
			return (
				<>{'This password reset link has invalid. It may have already been used. Try '}<Link href="/forgot-password">{'requesting another reset'}</Link>{'.'}</>
			)

		case 'auth/user-disabled':
			return (
				<>{'This user has been disabled. Please contact us on Discord to reactivate your account.'}</>
			)

		case 'auth/user-not-found':
			return (
				<>{'We couldn\'t find a user associated with this password reset link. The account may have been deleted after the reset link was sent.'}</>
			)

		default:
			return `Unrecognized error code: ${code}`
	}
}

export default function ResetPasswordPage () {
	const Router = useRouter()

	const [errorCode, setErrorCode] = useState(null)
	const [isResetCodeValid, setIsResetCodeValid] = useState(false)
	const [isResetting, setIsResetting] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)
	const [isValidatingResetCode, setIsValidatingResetCode] = useState(true)
	const [secondsToRedirect, setSecondsToRedirect] = useState(10)


	const handleSubmit = useCallback(async (formState, actions) => {
		const { updateValidity } = actions
		const { values } = formState

		setIsResetting(true)

		try {
			await auth.confirmPasswordReset(Router.query.oobCode, values.password)

			setIsSuccess(true)
		} catch (error) {
			switch (error?.code) {
				case 'auth/weak-password':
					updateValidity('password', ['Passwords must be at least 6 characters long.'])
					break

				default:
					setErrorCode(error.code)
					setIsResetCodeValid(false)
					console.log(error)
			}
		}

		setIsResetting(false)
	}, [setIsResetting])

	const runResetTimer = useCallback(() => {
		if (isSuccess) {
			if (secondsToRedirect === 0) {
				Router.push('/login')
				return
			}

			setTimeout(() => setSecondsToRedirect(previousValue => previousValue - 1), 1000)
		}
	}, [
		isSuccess,
		secondsToRedirect,
		setSecondsToRedirect,
	])

	const verifyResetCode = useCallback(async () => {
		try {
			await auth.verifyPasswordResetCode(Router.query.oobCode)
			setIsResetCodeValid(true)
		} catch (error) {
			setErrorCode(error.code)
			console.log(error)
		}

		setIsValidatingResetCode(false)
	}, [
		setIsResetCodeValid,
		setIsValidatingResetCode,
	])

	useEffect(verifyResetCode, [verifyResetCode])

	useEffect(runResetTimer, [runResetTimer])

	return (
		<BaseLayout
			description="Reset Password"
			title="Reset Password">
			<section className="section">
				<div className="columns container">
					<div className="box column is-half is-offset-one-quarter section">
						{isValidatingResetCode && 'Validating reset code...'}

						{(!isValidatingResetCode && !isResetCodeValid) && (
							<ErrorCode code={errorCode} />
						)}

						{(!isValidatingResetCode && isResetCodeValid) && (
							<Form
								initialValues={{ password: '' }}
								isDisabled={isResetting}
								onSubmit={handleSubmit}>
								<h2 className="title">{'Reset Password'}</h2>

								<Field
									id="password"
									label="Enter your new password">
									<Input
										id="password"
										isRequired
										type="password" />
								</Field>

								<div className="columns is-vcentered">
									<div className="column">
										{isSuccess && (
											<span className="has-text-success">{`Your password has been reset! You may now login with your new password. You will be automatically redirected in ${secondsToRedirect} seconds`}</span>
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
						)}
					</div>
				</div>
			</section>
		</BaseLayout>
	)
}
