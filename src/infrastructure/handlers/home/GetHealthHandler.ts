import {Context} from 'hono'

export class GetHealthHandler {
  public async handle(c: Context) {
    return c.json({ status: 'ok' })
  }
}