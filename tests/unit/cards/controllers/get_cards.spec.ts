import { test } from '@japa/runner'
import { HttpContextFactory } from '@adonisjs/core/factories/http'
import CardService from "../../../../app/cards/services/CardService.js";
import { CardRepository } from "../../../../app/cards/repositories/cardRepository.js";
import GetCardsController from "../../../../app/cards/controllers/GetCardsController.js";
import { CategoryNumbers } from "../../../../app/categories/enums/categoryNumbers.js";
import sinon from "sinon";

test.group('Cards controllers get cards', (group) => {

  group.each.teardown(() => {
    sinon.restore()
  })

  test('should call service with validated payload from query strings', async ({ assert }) => {
    const cardService = new CardService(new CardRepository())
    const getCardsMock = sinon.stub(cardService, 'getCards').resolves([])
    const controller = new GetCardsController(cardService)

    const httpContext = new HttpContextFactory().create()

    httpContext.request.updateQs({
      tags: ['svt'],
      categories: [CategoryNumbers.FIRST]
    })

    await controller.getCardsByFilters(httpContext)

    assert.isTrue(getCardsMock.calledOnce)
    assert.deepEqual(getCardsMock.firstCall.args[0], {
      tags: ['svt'],
      categories: [CategoryNumbers.FIRST]
    })
  })

  test('should normalise single string filters into arrays before calling service', async ({ assert }) => {
    const cardService = new CardService(new CardRepository())
    const getCardsMock = sinon.stub(cardService, 'getCards').resolves([])
    const controller = new GetCardsController(cardService)
    const httpContext = new HttpContextFactory().create()

    httpContext.request.updateQs({ tags: 'maths' })

    await controller.getCardsByFilters(httpContext)
    assert.deepEqual(getCardsMock.firstCall.args[0], { tags: ['maths'] })
  })
})
