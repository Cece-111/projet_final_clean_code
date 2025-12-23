import { test } from '@japa/runner'
import { HttpContextFactory } from '@adonisjs/core/factories/http'
import { CardService } from "#cards/contracts/card.service"
import sinon from "sinon"
import AnswerCardController from "#cards/controllers/answer.card.controller";

test.group('AnswerCardController', (group) => {
  group.each.teardown(() => sinon.restore())

  test('should call service with id from params and isValid from body', async ({ assert }) => {
    const cardServiceMock = {
      validate: sinon.stub().resolves(),
    } as unknown as CardService

    const controller = new AnswerCardController(cardServiceMock)
    const ctx = new HttpContextFactory().create()

    ctx.params.id = 'my-card-uuid'
    ctx.request.setInitialBody({ isValid: true })

    await controller.handle(ctx)

    const validateStub = cardServiceMock.validate as sinon.SinonStub
    assert.isTrue(validateStub.calledWith('my-card-uuid', true))
    assert.equal(ctx.response.getStatus(), 204)
  })
})
