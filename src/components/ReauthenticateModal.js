// Module imports
import {
	useCallback,
	useState,
} from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'





// Local imports
import { Button } from 'components/Button'
import { Field } from 'components/Forms/Field'
import { firebase } from 'helpers/firebase'
import { Form } from 'components/Forms/Form'
import { FormButton } from 'components/Forms/FormButton'
import { Input } from 'components/Forms/Input'
import { Modal } from 'components/Modal'
import { useAuth } from 'contexts/AuthContext'





export function ReauthenticateModal (props) {
	const {
		onClose,
		onSuccess,
	} = props
	const { user } = useAuth()

	const [isReauthenticating, setIsReauthenticating] = useState(false)

	const handleSubmit = useCallback(async (formState, actions) => {
		const { updateValidity } = actions
		const { values } = formState

		setIsReauthenticating(true)

		try {
			const authCredential = firebase.auth.EmailAuthProvider.credential(
				user.email,
				values['reauthenticate-password'],
			)

			await user.reauthenticateWithCredential(authCredential)

			onSuccess()
		} catch (error) {
			switch (error?.code) {
				case 'auth/wrong-password':
					updateValidity('reauthenticate-password', ['Wrong password'])
					break

				default:
					console.log('error:', error)
			}
		}

		setIsReauthenticating(false)
	}, [
		setIsReauthenticating,
		user.email,
	])

	return (
		<Modal onClose={onClose}>
			<div className="modal-card">
				<Form
					initialValues={{ 'reauthenticate-password': '' }}
					onSubmit={handleSubmit}>
					<header className="modal-card-head">
						<p className="modal-card-title">{'Verify your password'}</p>
					</header>

					<section className="modal-card-body">
						<Field
							id="reauthenticate-password"
							label="Re-enter your password">
							<Input
								id="reauthenticate-password"
								isDisabled={isReauthenticating}
								type="password" />
						</Field>
					</section>

					<footer className="modal-card-foot is-justify-content-space-between">
						<FormButton
							className={classnames({
								'is-primary': true,
								'is-loading': isReauthenticating,
							})}
							style={{ order: '2' }}
							type="submit">
							{'Submit'}
						</FormButton>

						<Button
							onClick={onClose}
							style={{ order: '1' }}>
							{'Cancel'}
						</Button>
					</footer>
				</Form>
			</div>
		</Modal>
	)
}

ReauthenticateModal.propTypes = {
	onClose: PropTypes.func.isRequired,
	onSuccess: PropTypes.func.isRequired,
}
