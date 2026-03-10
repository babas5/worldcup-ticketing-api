import { Hono } from 'hono'
import { matchs } from './mock/matchs.js'

export const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/matchs', (c) => {
  return c.json(matchs)
})

app.get('/matchs/:id', (c) => {
  const id = Number(c.req.param('id'))
  const match = matchs.find(m => m.id === id)

  if (!match) {
    return c.json({ error: 'Match not found' }, 404)
  }

  return c.json(match)
})
