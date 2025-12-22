import { test } from '@japa/runner'
import sinon from 'sinon'
import { HttpContextFactory } from '@adonisjs/core/factories/http'
import CardService from "../../../../app/cards/services/CardService.js";
import {CardRepository} from "../../../../app/cards/repositories/cardRepository.js";
import GetCardsController from "../../../../app/cards/controllers/GetCardsController.js";

test.group('Cards controllers get cards', (group) => {

  group.each.teardown(() => {
    sinon.restore()
  })

  test('should call service with validated payload', async ({ assert }) => {
    const cardService = new CardService(new CardRepository())
    const getCardsMock = sinon.stub(cardService, 'getCards').resolves([])
    const controller = new GetCardsController(cardService)

    const httpContext = new HttpContextFactory().create()
    const payload = {
      tags: ['svt'],
      categories: ['FIRST']
    }

    httpContext.request.setInitialBody(payload)
    await controller.getCardsByFilters(httpContext)
    assert.isTrue(getCardsMock.calledOnce)
    assert.deepEqual(getCardsMock.firstCall.args[0], payload)
  })

  test('should work with partial filters', async ({ assert }) => {
    const cardService = new CardService(new CardRepository())
    const getCardsMock = sinon.stub(cardService, 'getCards').resolves([])
    const controller = new GetCardsController(cardService)

    const httpContext = new HttpContextFactory().create()
    httpContext.request.setInitialBody({ tags: ['maths'] })

    await controller.getCardsByFilters(httpContext)

    assert.deepEqual(getCardsMock.firstCall.args[0], { tags: ['maths'] })
  })
})
