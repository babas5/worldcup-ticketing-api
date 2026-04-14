import {Hono} from 'hono'
import {GetMatchsHandler} from '../handlers/GetMatchsHandler.js'
import {GetMatchByIdHandler} from '../handlers/GetMatchByIdHandler.js'
import {GetMatchByStage} from '../handlers/GetMatchByStage.js'
import {GetMatchsByStatusHandler} from '../handlers/GetMatchsByStatusHandler.js'

const matchsRouter = new Hono()

matchsRouter.get('/stage/:stage', (c) => new GetMatchByStage().handle(c))


matchsRouter.get("/", (c) => new GetMatchsHandler().handle(c))

matchsRouter.get('/status/:status', (c) => new GetMatchsByStatusHandler().handle(c))

matchsRouter.get("/:id", (c) => new GetMatchByIdHandler().handle(c))



export default matchsRouter