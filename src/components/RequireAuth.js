// Module imports
import {
	useEffect,
	useState,
} from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import PropTypes from 'prop-types'





// Local imports
import { useAuth } from 'contexts/AuthContext'





export function RequireAuth (props) {
	const {
		children,
		isDisabled,
		verifyingComponent,
	} = props
	const Router = useRouter()
	const {
		isLoaded,
		user,
	} = useAuth()
	const [isAuthCheckComplete, setIsAuthCheckComplete] = useState(isDisabled || Boolean(user))
	const [isAuthCheckFailed, setIsAuthCheckFailed] = useState(false)

	useEffect(() => {
		if (!isDisabled && !user) {
			setIsAuthCheckComplete(false)
		}
	}, [
		isDisabled,
		setIsAuthCheckComplete,
		user,
	])

	useEffect(() => {
		if (!isAuthCheckComplete && isLoaded) {
			if (!user) {
				setIsAuthCheckFailed(true)
			}

			setIsAuthCheckComplete(true)
		}
	}, [
		isAuthCheckComplete,
		isLoaded,
		setIsAuthCheckComplete,
		setIsAuthCheckFailed,
		user,
	])

	if (!isAuthCheckComplete) {
		return verifyingComponent
	}

	if (isAuthCheckFailed) {
		return (
			<section className="box section">
				<p>You must be logged in to see this.</p>
				<Link href={`/login?destination=${encodeURIComponent(Router.asPath)}`}>
					<a className="button is-primary">
						Login
					</a>
				</Link>
			</section>
		)
	}

	return children
}

RequireAuth.defaultProps = {
	isDisabled: false,
	verifyingComponent: null,
}

RequireAuth.propTypes = {
	children: PropTypes.node.isRequired,
	isDisabled: PropTypes.bool,
	verifyingComponent: PropTypes.node,
}
