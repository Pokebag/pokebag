// Module imports
import body from 'koa-body'
import cors from '@koa/cors'
import compress from 'koa-compress'
import Koa from 'koa'
import noTrailingSlash from 'koa-no-trailing-slash'





// Local imports
import './routes/index.js'
import bodyBuilder from './helpers/bodyBuilder.js'
import statusCodeGenerator from './helpers/statusCodeGenerator.js'
import router from './structures/Router.js'





// Local constants
const {
	PORT = 3001,
} = process.env
const app = new Koa()





// Attach middlewares
app.use(noTrailingSlash())
app.use(compress())
app.use(cors())
app.use(body())
app.use(statusCodeGenerator())
app.use(bodyBuilder())

app.use(router.routes())
app.use(router.allowedMethods())





app.listen(PORT)
console.log(`Server started; listening on port ${PORT}...`)
