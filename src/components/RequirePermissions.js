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
		isDisabled,
		notPermittedComponent,
		permissions,
		verifyingComponent,
	} = props
	const {
		isLoaded,
		settings,
	} = useAuth()
	const [state, setState] = useState({
		isPermissionCheckComplete: isDisabled,
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
		return verifyingComponent
	}

	if (!state.isPermitted) {
		return notPermittedComponent
	}

	return children
}

RequirePermissions.defaultProps = {
	isDisabled: false,
	notPermittedComponent: null,
	verifyingComponent: null,
}

RequirePermissions.propTypes = {
	children: PropTypes.node.isRequired,
	isDisabled: PropTypes.bool,
	notPermittedComponent: PropTypes.node,
	verifyingComponent: PropTypes.node,
	permissions: PropTypes.arrayOf(PropTypes.string).isRequired,
}
