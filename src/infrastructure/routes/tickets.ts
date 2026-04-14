import { Hono } from 'hono'
import { CreateTicketHandler } from '../handlers/CreateTicketHandler.js'

const ticketsRouter = new Hono()

ticketsRouter.post('/', (c) => new CreateTicketHandler().handle(c))

export default ticketsRouter