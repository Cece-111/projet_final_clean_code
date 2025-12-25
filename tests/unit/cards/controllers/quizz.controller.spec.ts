import { test } from '@japa/runner'
import sinon from 'sinon'
import { HttpContext } from '@adonisjs/core/http'

test.group('QuizzController', (group) => {
  group.each.teardown(() => {
    sinon.restore()
  })

  test('should call service.getCardsForQuizz with provided date', async ({ assert }) => {
    const serviceMock = {
      getCardsForQuizz: sinon.stub().resolves([])
    } as unknown as CardService

    const controller = new QuizzController(serviceMock)

    const ctx = {
      request: {
        qs: () => ({ date: '2023-01-01' })
      },
      response: {
        ok: sinon.stub()
      }
    } as unknown as HttpContext

    await controller.handle(ctx)

    assert.isTrue((serviceMock.getCardsForQuizz as sinon.SinonStub).called)
    const callArgs = (serviceMock.getCardsForQuizz as sinon.SinonStub).firstCall.args
    assert.equal(callArgs[0].toISOString().split('T')[0], '2023-01-01')
  })

  test('should use today if no date provided', async ({ assert }) => {
    const serviceMock = {
      getCardsForQuizz: sinon.stub().resolves([])
    } as unknown as CardService
    const controller = new QuizzController(serviceMock)
    const ctx = {
      request: {
        qs: () => ({})
      },
      response: {
        ok: sinon.stub()
      }
    } as unknown as HttpContext

    await controller.handle(ctx)

    assert.isTrue((serviceMock.getCardsForQuizz as sinon.SinonStub).called)
    const arg = (serviceMock.getCardsForQuizz as sinon.SinonStub).firstCall.args[0]
    assert.instanceOf(arg, Date)
    const diff = Math.abs(new Date().getTime() - arg.getTime())
    assert.isBelow(diff, 1000)
  })
})
