import { test } from '@japa/runner'
import { HttpContextFactory } from '@adonisjs/core/factories/http'
import { CategoryNumbers } from "#app/categories/enums/category.numbers"
import { IndexCardService } from "#cards/application/contracts/index.card.service"
import GetCardsController from "#cards/infrastructure/controllers/get.cards.controller"
import { CardFilters } from '#cards/domain/contracts/card.filters'
import { CardEntity } from '#cards/domain/card.entity'

test.group('GetCardsController (Unit)', () => {

  class FakeIndexCardService extends IndexCardService {
    public lastFiltersReceived: CardFilters | null = null
    public callCount = 0

    async index(filters: CardFilters): Promise<CardEntity[]> {
      this.callCount++
      this.lastFiltersReceived = filters
      return []
    }
  }

  test('should call getCards service with mapped categories from query params', async ({ assert }) => {
    const service = new FakeIndexCardService()
    const controller = new GetCardsController(service)
    const ctx = new HttpContextFactory().create()

    ctx.request.updateQs({
      tags: ['svt', 'english'],
      categories: 'FIRST'
    })

    await controller.handle(ctx)

    assert.equal(service.callCount, 1)
    assert.deepEqual(service.lastFiltersReceived, {
      tags: ['svt', 'english'],
      categories: [CategoryNumbers.FIRST]
    })
  })

  test('should handle single string tag and map it to array', async ({ assert }) => {
    const service = new FakeIndexCardService()
    const controller = new GetCardsController(service)
    const ctx = new HttpContextFactory().create()

    ctx.request.updateQs({ tags: 'maths' })

    await controller.handle(ctx)

    assert.deepEqual(service.lastFiltersReceived?.tags, ['maths'])
  })
})
