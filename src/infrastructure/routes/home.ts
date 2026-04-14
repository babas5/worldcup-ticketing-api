import {Hono} from 'hono'
import {GetHomeHandler} from '../handlers/home/GetHomeHandler.js'
import {GetHealthHandler} from '../handlers/home/GetHealthHandler.js'

const homeRouter = new Hono()

homeRouter.get('/', (c) => new GetHomeHandler().handle(c))
homeRouter.get('/health', (c) => new GetHealthHandler().handle(c))

export default homeRouter