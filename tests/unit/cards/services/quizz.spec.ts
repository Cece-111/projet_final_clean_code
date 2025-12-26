import { test } from '@japa/runner'
import sinon from 'sinon'
import { CardRepository } from '../../../../app/modules/cards/contracts/card.repository'
import { CardServiceImplementation } from "../../../../app/modules/cards/application/services/card.service.implementation"
import { CardEntity } from "../../../../app/modules/cards/domain/card.entity"
import {CategoryNumbers} from "../../../../app/modules/categories/enums/category.numbers";

test.group('Card Service - getCardsForQuizz (Unit)', (group) => {
  group.each.teardown(() => {
    sinon.restore()
  })

  test('should return cards that strictly match the frequency delay', async ({ assert }) => {
    const quizzDate = new Date('2023-01-10T12:00:00Z')

    const cardNew = CardEntity.fromPersistence('1', 'Q', 'A', CategoryNumbers.FIRST, 'tag', null)

    const dateYesterday = new Date('2023-01-09T12:00:00Z')
    const cardCat1Due = CardEntity.fromPersistence('2', 'Q', 'A', CategoryNumbers.FIRST, 'tag', dateYesterday)

    const cardCat1NotDue = CardEntity.fromPersistence('3', 'Q', 'A', CategoryNumbers.FIRST, 'tag', quizzDate)

    const date2DaysAgo = new Date('2023-01-08T12:00:00Z')
    const cardCat2Due = CardEntity.fromPersistence('4', 'Q', 'A', CategoryNumbers.SECOND, 'tag', date2DaysAgo)

    const cardCat2NotDue = CardEntity.fromPersistence('5', 'Q', 'A', CategoryNumbers.SECOND, 'tag', dateYesterday)

    const cardDone = CardEntity.fromPersistence('6', 'Q', 'A', CategoryNumbers.DONE, 'tag', null)


    const repoMock = {
      findByFilters: sinon.stub().resolves([
        cardNew, cardCat1Due, cardCat1NotDue, cardCat2Due, cardCat2NotDue, cardDone
      ]),
      create: sinon.stub(),
      findById: sinon.stub(),
      save: sinon.stub()
    } as unknown as CardRepository

    const service = new CardServiceImplementation(repoMock)

    // @ts-ignore
    const result = await service.getCardsForQuizz(quizzDate)

    const ids = result.map(c => c.snapshot().id)
    assert.include(ids, '1')
    assert.include(ids, '2')
    assert.include(ids, '4')

    assert.notInclude(ids, '3')
    assert.notInclude(ids, '5')
    assert.notInclude(ids, '6')
  })
})
