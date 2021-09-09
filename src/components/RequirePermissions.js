// Module imports
import {
	useEffect,
	useState,
} from 'react'
import PropTypes from 'prop-types'





// Local imports
import { useAuth } from 'contexts/AuthContext'





export function RequirePermissions (props) {
	const {
		children,
		permissions,
	} = props
	const {
		isLoaded,
		settings,
	} = useAuth()
	const [state, setState] = useState({
		isPermissionCheckComplete: false,
		isPermitted: null,
	})

	useEffect(() => {
		if (isLoaded && settings) {
			setState({
				isPermissionCheckComplete: true,
				isPermitted: permissions.every(permission => {
					return settings[permission]
				}),
			})
		}
	}, [
		isLoaded,
		permissions,
		setState,
		settings,
	])

	if (!state.isPermissionCheckComplete) {
		return (
			<section className="box section">
				{'Verifying permissions...'}
			</section>
		)
	}

	if (!state.isPermitted) {
		return (
			<section className="box section">
				{'Sorry, you\'re not allowed to be here. 🤷‍♂️'}
			</section>
		)
	}

	return children
}

RequirePermissions.propTypes = {
	children: PropTypes.node.isRequired,
	permissions: PropTypes.arrayOf(PropTypes.string).isRequired,
}
