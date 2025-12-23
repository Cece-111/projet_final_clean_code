import { test } from '@japa/runner'
import testUtils from "@adonisjs/core/services/test_utils";
import Card from '#models/card'
import { CardRepository } from "../../../../app/cards/repositories/cardRepository.js";
import { CategoryNumbers } from "../../../../app/categories/enums/categoryNumbers.js";
import { CardEntity } from "../../../../app/cards/domain/cardEntity.js";

test.group('CardRepository', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('findById should return a CardEntity when card exists in DB', async ({ assert }) => {
    const createdCard = await Card.create({
      question: 'What is SOLID?',
      answer: 'Five design principles',
      category: CategoryNumbers.FIRST,
      tag: 'architecture'
    })
    const repo = new CardRepository()

    const result = await repo.findById(createdCard.id)

    assert.equal(result.snapshot().id, createdCard.id)
  })

  test('findById should throw E_ROW_NOT_FOUND when card does not exist', async ({ assert }) => {
    const repo = new CardRepository()

    await assert.rejects(async () => {
      await repo.findById('non-existent-uuid')
    })
  })

  test('save should update an existing card in DB', async ({ assert }) => {
    const cardDb = await Card.create({
      question: 'Original Question',
      answer: 'Original Answer',
      category: CategoryNumbers.FIRST,
      tag: 'test'
    })

    const repo = new CardRepository()
    const entity = CardEntity.fromPersistence(
      cardDb.id,
      cardDb.question,
      cardDb.answer,
      CategoryNumbers.SECOND,
      cardDb.tag
    )

    await repo.save(entity)

    const updatedCard = await Card.findOrFail(cardDb.id)
    assert.equal(updatedCard.category, CategoryNumbers.SECOND)
  })
})
