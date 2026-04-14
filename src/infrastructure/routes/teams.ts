import {Hono } from 'hono'
import {GetTeamsHandler} from '../handlers/GetTeamsHandler.js'
import {GetTeamByFifaCodeHandler} from '../handlers/GetTeamByFifaCodeHandler.js'
import {GetTeamMatchsByFifaCodeHandler } from '../handlers/GetTeamMatchsByFifaCodeHandler.js'

const teamsRouter = new Hono()
teamsRouter.get('/', (c) => new GetTeamsHandler().handle(c))
teamsRouter.get('/:fifaCode', (c) => new GetTeamByFifaCodeHandler().handle(c))
teamsRouter.get('/:fifaCode/matchs', (c) => new GetTeamMatchsByFifaCodeHandler().handle(c))

export default teamsRouter