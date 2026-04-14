import {Hono} from 'hono'
import matchsRouter from './routes/matchs.js'
import citiesRouter from './routes/cities.js'
import countriesRouter from './routes/countries.js'
import stadiumsRouter from './routes/stadiums.js'
import teamsRouter from './routes/teams.js'
import homeRouter from './routes/home.js'
import ticketsRouter from './routes/tickets.js'
import { HTTPException } from 'hono/http-exception'

export const app = new Hono()

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json(
      { message: err.message }, 
      err.status               
    )
  }

  console.error(err)
  return c.json(
    { message: 'Une erreur est survenue' },
    500
  )
})

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/health', (c) => c.json({ status: 'ok' }))

app.route('/matchs', matchsRouter)
app.route('/', homeRouter)
app.route('/matchs', matchsRouter)
app.route('/cities', citiesRouter)
app.route('/countries', countriesRouter)
app.route('/stadiums', stadiumsRouter)
app.route('/tickets', ticketsRouter)
app.route('/teams', teamsRouter)