import {Hono} from 'hono'
import {GetCountriesHandler } from '../handlers/GetCountriesHandler.js'
import {GetCountryByCodeHandler} from '../handlers/GetCountryByCodeHandler.js'
import { GetCountryCitiesHandler } from '../handlers/GetCountryCitiesHandler.js'

const countriesRouter = new Hono()

countriesRouter.get('/:code/cities', (c) => new GetCountryCitiesHandler().handle(c))

countriesRouter.get('/', (c) => new GetCountriesHandler().handle(c))

countriesRouter.get('/:code', (c) => new GetCountryByCodeHandler().handle(c))

export default countriesRouter