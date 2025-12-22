import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class ValidationException extends Exception {
  static status = 400
  static code = 'E_VALIDATION_FAILURE'

  async handle(error: this, { response }: HttpContext) {
    response.status(error.status).send({
      errors: [{ message: error.message }]
    })
  }
}
