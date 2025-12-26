import { test } from '@japa/runner'
import testUtils from "@adonisjs/core/services/test_utils"
import Card from "#models/card"
import { CategoryNumbers } from "#app/modules/categories/enums/category.numbers"
import { DateTime } from 'luxon'

test.group('Cards controllers - Quizz Logic', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('should return only cards due for review (nextReviewDate <= now)', async ({ client, assert }) => {
    const overdueCard = await Card.create({
      question: 'Past due?',
      answer: 'Yes',
      category: CategoryNumbers.FIRST,
      tag: 'test',
      nextReviewDate: DateTime.now().minus({ days: 1 }).startOf('day')
    })

    const dueTodayCard = await Card.create({
      question: 'Due today?',
      answer: 'Yes',
      category: CategoryNumbers.FIRST,
      tag: 'test',
      nextReviewDate: DateTime.now().startOf('day')
    })

    const futureCard = await Card.create({
      question: 'Future?',
      answer: 'No',
      category: CategoryNumbers.SECOND,
      tag: 'test',
      nextReviewDate: DateTime.now().plus({ days: 1 }).startOf('day')
    })

    const response = await client.get('/cards/quizz')

    response.assertStatus(200)
    const body = response.body()

    const ids = body.map((c: any) => c.id)

    assert.include(ids, overdueCard.id, 'Should include the overdue card')
    assert.include(ids, dueTodayCard.id, 'Should include the card due today')
    assert.notInclude(ids, futureCard.id, 'Should NOT include the future card')
  })

  test('should return cards for a specific date via query string', async ({ client, assert }) => {
    const targetDate = DateTime.now().plus({ days: 3 }).startOf('day')

    const specificCard = await Card.create({
      question: 'Target date?',
      answer: 'Yes',
      category: CategoryNumbers.FIRST,
      tag: 'test',
      nextReviewDate: targetDate
    })

    const response = await client.get('/cards/quizz').qs({
      date: targetDate.toJSDate()
    })

    response.assertStatus(200)
    const body = response.body()

    assert.exists(body.find((c: any) => c.id === specificCard.id))
  })
  test('should return 400 because incorrect date fromat ', async ({ client }) => {
    const targetDate = DateTime.now().plus({ days: 3 }).startOf('day')
    const response = await client.get('/cards/quizz').qs({
      date: targetDate
    })
    response.assertStatus(400)
  })

  test('should return empty array if no cards are due', async ({ client, assert }) => {
    const card = await Card.create({
      question: 'Far future',
      answer: 'Wait',
      category: CategoryNumbers.FIRST,
      tag: 'test',
      nextReviewDate: DateTime.now().plus({ years: 1 })
    })

    const response = await client.get('/cards/quizz')
    const body = response.body()

    const ids = body.map((c: any) => c.id)
    response.assertStatus(200)
    assert.notInclude(ids, card.id)
  })

  test('should exclude cards with category DONE even if date is past', async ({ client, assert }) => {
    const card = await Card.create({
      question: 'Finished card',
      answer: 'Done',
      category: CategoryNumbers.DONE,
      tag: 'test',
      nextReviewDate: DateTime.now().minus({ days: 10 })
    })

    const response = await client.get('/cards/quizz')

    const body = response.body()

    const ids = body.map((c: any) => c.id)
    response.assertStatus(200)

    assert.include(ids, card.id, 'Should include the overdue card')
  })
})
