import { HttpContext } from '@adonisjs/core/http'
import { NextFn } from '@adonisjs/core/types/http'

export default class AuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const isAuthenticated = true

    if (!isAuthenticated) {
      return ctx.response.unauthorized({ message: 'Must be logged in' })
    }

    return next()
  }
}
