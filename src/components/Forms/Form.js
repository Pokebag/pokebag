// Module imports
import {
	createContext,
	forwardRef,
	useCallback,
	useContext,
	useEffect,
	useReducer,
} from 'react'
import PropTypes from 'prop-types'





// Constants
const INITIAL_STATE = {
	errors: {},
	isValid: false,
	isTouched: false,
	touched: {},
	validity: {},
	values: {},
}





function reducer(state, action) {
	const {
		payload,
		type,
	} = action
	const newState = {
		...INITIAL_STATE,
		...state,
	}

	switch (type) {
		case 'validity changed':
			newState.validity = {
				...newState.validity,
				[payload.fieldName]: !payload.errors?.length,
			}
			newState.errors = {
				...newState.errors,
				[payload.fieldName]: payload.errors,
			}
			newState.isValid = !Object
				.values(newState.validity)
				.some(isValid => !isValid)
			break

		case 'value changed':
			newState.values = {
				...newState.values,
				[payload.fieldName]: payload.value,
			}
			newState.touched = {
				...newState.touched,
				[payload.fieldName]: newState.initialValues[payload.fieldName] !== payload.value,
			}
			newState.isTouched = Object
				.values(newState.touched)
				.some(isTouched => isTouched)
			break

		case 'reset state':
			return createInitialState(payload)

		default:
			console.warn(`Unrecognized action dispatched: ${type}`, payload)
			return state
	}

	return newState
}





export const FormContext = createContext({
	...INITIAL_STATE,
	reset: () => {},
	updateValidity: () => {},
	updateValue: () => {},
})

function createInitialState(options) {
	const { initialValues } = options

	return {
		...INITIAL_STATE,
		errors: Object
			.keys(initialValues)
			.reduce((accumulator, key) => {
				accumulator[key] = []
				return accumulator
			}, {}),
		initialValues,
		touched: Object
			.keys(initialValues)
			.reduce((accumulator, key) => {
				accumulator[key] = false
				return accumulator
			}, {}),
		validity: Object
			.keys(initialValues)
			.reduce((accumulator, key) => {
				accumulator[key] = false
				return accumulator
			}, {}),
		values: { ...initialValues },
	}
}

export const Form = forwardRef((props, ref) => {
	const {
		children,
		className,
		initialValues,
		isDisabled,
		onSubmit,
	} = props
	const [state, dispatch] = useReducer(reducer, createInitialState({ initialValues }))

	const updateValidity = useCallback((fieldName, errors) => {
		dispatch({
			payload: {
				errors,
				fieldName,
			},
			type: 'validity changed',
		})
	}, [dispatch])

	const updateValue = useCallback((fieldName, value) => {
		dispatch({
			payload: {
				fieldName,
				value,
			},
			type: 'value changed',
		})
	}, [
		dispatch,
	])

	const reset = useCallback(options => {
		dispatch({
			payload: options,
			type: 'reset state',
		})
	}, [ dispatch ])

	const handleSubmit = useCallback(event => {
		event.preventDefault()
		onSubmit(state, { updateValidity })
	}, [
		onSubmit,
		state,
		updateValidity,
	])

	return (
		<FormContext.Provider
			value={{
				...state,
				reset,
				updateValidity,
				updateValue,
			}}>
			<form
				className={className}
				onSubmit={handleSubmit}
				ref={ref}>
				<fieldset disabled={isDisabled}>
					{children}
				</fieldset>
			</form>
		</FormContext.Provider>
	)
})

Form.defaultProps = {
	className: null,
	initialValues: {},
	initialValuesisDisabled: false,
	onSubmit: () => {},
}

Form.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	initialValues: PropTypes.object,
	isDisabled: PropTypes.bool,
	onSubmit: PropTypes.func,
}

export const useForm = () => useContext(FormContext)
