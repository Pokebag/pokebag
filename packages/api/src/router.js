// Local imports
import { Router } from './structures/Router.js'
import { uniteRouter } from './routes/unite/router.js'





const mainRouter = new Router()

mainRouter.addSubRouter('/unite/:patchVersion?', uniteRouter)

export { mainRouter }
