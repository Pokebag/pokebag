// Local imports
import { Router } from '../../structures/Router.js'

// Routes
import { HeldItemsRoute } from './held-items.js'
import { PokemonRoute } from './pokemon.js'
import { SignleHeldItemRoute } from './held-items/held-item.js'
import { SinglePokemonRoute } from './pokemon/pokemon.js'
import { UniteRoute } from './unite.js'





const uniteRouter = new Router()

uniteRouter.addRoute(new SignleHeldItemRoute)
uniteRouter.addRoute(new HeldItemsRoute)
uniteRouter.addRoute(new SinglePokemonRoute)
uniteRouter.addRoute(new PokemonRoute)
uniteRouter.addRoute(new UniteRoute)

export { uniteRouter }
