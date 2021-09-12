// Module imports
import {
	useCallback,
	useMemo,
	useState,
} from 'react'
import classnames from 'classnames'





// Local imports
import { Field } from 'components/Forms/Field'
import { firestore } from 'helpers/firebase'
import { Form } from 'components/Forms/Form'
import { FormButton } from 'components/Forms/FormButton'
import { Input } from 'components/Forms/Input'
import { useAuth } from 'contexts/AuthContext'





export function UsernameForm() {
	const {
		profile,
		user,
		validateUsername,
	} = useAuth()

	const [isSuccess, setIsSuccess] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)

	const initialValues = useMemo(() => {
		return {
			username: profile?.username
		}
	}, [profile?.username])

	const resetIsSuccess = useCallback(() => setIsSuccess(false), [setIsSuccess])

	const onSubmit = useCallback(async formState => {
		setIsSubmitting(true)

		try {
			await firestore
				.collection('profiles')
				.doc(user.uid)
				.update({
					username: formState.values.username,
				})

			setIsSuccess(true)
			setTimeout(resetIsSuccess, 10000)
		} catch (error) {
			console.log(error)
		}

		setIsSubmitting(false)
	}, [
		resetIsSuccess,
		setIsSubmitting,
		user?.uid,
	])

	const onValidate = useCallback(async value => {
		if (value === profile.username) {
			return null
		}

		const usernameIsAvailable = await validateUsername(value)

		if (usernameIsAvailable) {
			return null
		}

		return 'Username is unavailable'
	}, [
		profile?.username,
		validateUsername,
	])

	return (
		<section className="box section">
			<h3 className="title is-4">
				{'Change your username'}
			</h3>

			<Form
				initialValues={initialValues}
				isDisabled={isSubmitting}
				onSubmit={onSubmit}>
				<Field
					helperText={(
						<>Changing your username <strong>will</strong> allow somebody else to create an account with your old username.</>
					)}
					id="username"
					label="New Username">
					<Input
						id="username"
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
	)
}
