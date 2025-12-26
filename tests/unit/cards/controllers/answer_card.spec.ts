import { test } from '@japa/runner'
import { HttpContextFactory } from '@adonisjs/core/factories/http'
import { ValidateCardService } from "../../../../app/modules/cards/application/contracts/validate.card.service"
import AnswerCardController from "../../../../app/modules/cards/infrastructure/controllers/answer.card.controller"

test.group('AnswerCardController (Unit)', () => {

  class FakeValidateCardService extends ValidateCardService {
    public lastCall: { cardId: string, isValid: boolean } | null = null
    public callCount = 0

    async validate(cardId: string, isValid: boolean): Promise<void> {
      this.callCount++
      this.lastCall = { cardId, isValid }
    }
  }

  test('should call validate service and return 204', async ({ assert }) => {
    const service = new FakeValidateCardService()
    const controller = new AnswerCardController(service)

    const ctx = new HttpContextFactory().create()
    const cardId = 'my-card-uuid'
    ctx.params.id = cardId
    ctx.request.setInitialBody({ isValid: true })

    await controller.handle(ctx)

    assert.equal(service.callCount, 1)

    assert.equal(service.lastCall?.cardId, cardId)
    assert.isTrue(service.lastCall?.isValid)

    assert.equal(ctx.response.getStatus(), 204)
  })
})
