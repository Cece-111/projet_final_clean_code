import { test } from '@japa/runner'
import testUtils from "@adonisjs/core/services/test_utils"
import Card from "#models/card"
import { CategoryNumbers } from "#app/categories/enums/category.numbers"

test.group('Cards answer / patch', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('should promote card to next category when answer is valid', async ({ client, assert }) => {
    const card = await Card.create({
      question: 'Is SOLID good?',
      answer: 'Yes',
      category: CategoryNumbers.FIRST,
      tag: 'clean-code'
    })

    const response = await client
      .patch(`/cards/${card.id}/answer`)
      .json({ isValid: true })

    response.assertStatus(204)

    const updatedCard = await Card.findOrFail(card.id)
    assert.equal(updatedCard.category, CategoryNumbers.SECOND)
  })

  test('should reset card to FIRST category when answer is invalid', async ({ client, assert }) => {
    const card = await Card.create({
      question: 'Is spaghetti code good?',
      answer: 'No',
      category: CategoryNumbers.THIRD,
      tag: 'clean-code'
    })

    const response = await client
      .patch(`/cards/${card.id}/answer`)
      .json({ isValid: false })

    response.assertStatus(204)

    const updatedCard = await Card.findOrFail(card.id)
    assert.equal(updatedCard.category, CategoryNumbers.FIRST)
  })

  test('should return 404 when card id does not exist', async ({ client }) => {
    const fakeUuid = '00000000-0000-0000-0000-000000000000'

    const response = await client
      .patch(`/cards/${fakeUuid}/answer`)
      .json({ isValid: true })

    response.assertStatus(404)
  })

  test('should return 400 when isValid is missing or wrong type', async ({ client }) => {
    const card = await Card.create({
      question: 'Q',
      answer: 'A',
      category: CategoryNumbers.FIRST,
      tag: 'T'
    })

    const response = await client
      .patch(`/cards/${card.id}/answer`)
      .json({ isValid: "not-a-boolean" })

    response.assertStatus(400)
  })
})
