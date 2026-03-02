import { serve } from '@hono/node-server'
import { app } from './app.js'

const port = 3000

serve({
  fetch: app.fetch,
  port: 3000
})

console.log('Port 3000')


