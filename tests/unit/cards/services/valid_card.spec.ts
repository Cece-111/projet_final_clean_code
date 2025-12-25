import { test } from '@japa/runner'
import sinon from 'sinon'
import { CardRepository } from '#cards/contracts/card.repository'
import { CardServiceImplementation } from "#cards/services/card.service.implementation"
import { CardEntity } from "#cards/domain/card.entity"
import {CategoryNumbers} from "#app/categories/enums/category.numbers";

test.group('Card Service - validate (Unit)', (group) => {
  group.each.teardown(() => {
    sinon.restore()
  })

  test('should move card to next category and save when answer is valid', async ({ assert }) => {
    const cardId = 'uuid-123'
    const entity = CardEntity.fromPersistence(
      cardId, 'Question', 'Answer', CategoryNumbers.FIRST, 'tag', null
    )

    const findByIdStub = sinon.stub().resolves(entity)
    const saveStub = sinon.stub().resolves()

    const repoMock = {
      findById: findByIdStub,
      save: saveStub
    } as unknown as CardRepository

    const service = new CardServiceImplementation(repoMock)

    await service.validate(cardId, true)

    assert.isTrue(findByIdStub.calledWith(cardId))

    assert.equal(entity.snapshot().category, CategoryNumbers.SECOND)
    assert.isNotNull(entity.snapshot().lastAnsweredDate)
    assert.isTrue(saveStub.calledWith(entity))
  })

  test('should move card to previous category (FIRST) if currently SECOND when answer is invalid', async ({ assert }) => {
    const cardId = 'uuid-456'
    const entity = CardEntity.fromPersistence(
      cardId, 'Q', 'A', CategoryNumbers.SECOND, 'tag', null
    )

    const findByIdStub = sinon.stub().resolves(entity)
    const saveStub = sinon.stub().resolves()

    const repoMock = {
      findById: findByIdStub,
      save: saveStub
    } as unknown as CardRepository

    const service = new CardServiceImplementation(repoMock)

    await service.validate(cardId, false)

    assert.equal(entity.snapshot().category, CategoryNumbers.FIRST)
    assert.isTrue(saveStub.calledWith(entity))
  })

  test('should move card to previous category (SECOND) if currently THIRD when answer is invalid', async ({ assert }) => {
    const cardId = 'uuid-789'
    const entity = CardEntity.fromPersistence(
      cardId, 'Q', 'A', CategoryNumbers.THIRD, 'tag', null
    )

    const findByIdStub = sinon.stub().resolves(entity)
    const saveStub = sinon.stub().resolves()

    const repoMock = {
      findById: findByIdStub,
      save: saveStub
    } as unknown as CardRepository

    const service = new CardServiceImplementation(repoMock)

    await service.validate(cardId, false)

    assert.equal(entity.snapshot().category, CategoryNumbers.SECOND)
    assert.isTrue(saveStub.calledWith(entity))
  })
})
