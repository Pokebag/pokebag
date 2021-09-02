// Module imports
import KoaRouter from 'koa-router'





class Router {
	router = new KoaRouter()

	addRoute(route) {
		const {
			handler,
			path,
		} = route
		let { methods } = route

		if (!Array.isArray(methods)) {
			methods = [methods]
		}

		methods.forEach(method => this.router[method](path, handler))
	}

	addSubRouter = (path, router) => {
		let localRouter = router

		if (router instanceof Router) {
			localRouter = router.router
		}

		this.router.use(path, localRouter.routes(), localRouter.allowedMethods())
	}
}





export { Router }
