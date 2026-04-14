import {Hono} from 'hono'
import {GetStadiumsHandler } from '../handlers/GetStadiumsHandler.js'
import {GetStadiumMatchsHandler} from '../handlers/GetStadiumMatchsHandler.js'
import {GetStadiumByNameHandler } from '../handlers/GetStadiumByNameHandler.js'

const stadiumsRouter = new Hono()
stadiumsRouter.get('/:name/matchs', (c) => new GetStadiumMatchsHandler().handle(c))

stadiumsRouter.get('/:name', (c) => new GetStadiumByNameHandler().handle(c))

stadiumsRouter.get('/', (c) => new GetStadiumsHandler().handle(c))
export default stadiumsRouter