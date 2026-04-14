import {Hono } from 'hono'
import {GetCitiesHandler } from '../handlers/GetCitiesHandler.js'
import {GetCityMatchsHandler} from '../handlers/GetCityMatchsHandler.js'
import {GetCityByNameHandler} from '../handlers/GetCityByNameHandler.js'

const citiesRouter = new Hono()

citiesRouter.get('/:name/matchs', (c) => new GetCityMatchsHandler().handle(c))

citiesRouter.get('/:name', (c) => new GetCityByNameHandler().handle(c))

citiesRouter.get('/', (c) => new GetCitiesHandler().handle(c))

export default citiesRouter 