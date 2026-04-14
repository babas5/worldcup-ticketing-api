import {Context } from 'hono'

export class GetHomeHandler {
  public async handle(c: Context) {
    return c.text('Hello Hono!')
  }
}