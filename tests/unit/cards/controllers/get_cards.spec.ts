import { test } from '@japa/runner'
import { HttpContextFactory } from '@adonisjs/core/factories/http'
import sinon from "sinon"
import {CardService} from "#cards/application/contracts/card.service";
import GetCardsController from "../../../../app/cards/infrastructure/controllers/get.cards.controller";
import {CategoryNumbers} from "#app/categories/enums/category.numbers";

test.group('Cards controllers get cards', (group) => {

  group.each.teardown(() => {
    sinon.restore()
  })

  test('should call service with validated and mapped payload', async ({ assert }) => {
    const cardServiceMock = {
      getCards: sinon.stub().resolves([]),
      create: sinon.stub(),
      validate: sinon.stub()
    } as unknown as CardService

    const controller = new GetCardsController(cardServiceMock)
    const httpContext = new HttpContextFactory().create()

    const queryParams = {
      tags: ['svt', 'english'],
      categories: 'FIRST'
    }
    httpContext.request.updateQs(queryParams)

    await controller.handle(httpContext)

    const getCardsStub = cardServiceMock.getCards as sinon.SinonStub
    assert.isTrue(getCardsStub.calledOnce)
    assert.deepEqual(getCardsStub.firstCall.args[0], {
      tags: ['svt', 'english'],
      categories: [CategoryNumbers.FIRST]
    })
  })

  test('should handle single string input and map it to array via validator logic', async ({ assert }) => {
    const cardServiceMock = {
      getCards: sinon.stub().resolves([]),
      create: sinon.stub(),
      validate: sinon.stub()
    } as unknown as CardService

    const controller = new GetCardsController(cardServiceMock)
    const httpContext = new HttpContextFactory().create()

    httpContext.request.updateQs({ tags: 'maths' })

    await controller.handle(httpContext)

    const getCardsStub = cardServiceMock.getCards as sinon.SinonStub
    assert.deepEqual(getCardsStub.firstCall.args[0], {
      tags: ['maths'],
    })
  })
})
