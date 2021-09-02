export class Route {
	/****************************************************************************\
	 * Class Properties
	\****************************************************************************/

	defaultOptions = {
		methods: ['get'],
	}

	handler = null

	path = null





	/****************************************************************************\
	 * Public Methods
	\****************************************************************************/

	constructor(options) {
		this.options = {
			...this.defaultOptions,
			...options,
		}
	}

	validate = () => {
		if (!this.path) {
			throw new Error('path is required')
		}

		if (!this.handler) {
			throw new Error('handler is required')
		}
	}





	/****************************************************************************\
	 * Getters
	\****************************************************************************/

	get methods() {
		return this.options.methods
	}
}
