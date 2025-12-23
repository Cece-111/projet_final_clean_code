import { test } from '@japa/runner'
import testUtils from "@adonisjs/core/services/test_utils"
import Card from "#models/card"
import {CategoryNumbers} from "#app/categories/enums/category.numbers";

test.group('Cards controllers get cards', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('should return the created card by its ID via the API route', async ({ client, assert }) => {
    const card = await Card.create({
      question: 'What is Clean Code?',
      answer: 'A book by Uncle Bob',
      category: CategoryNumbers.FIRST,
      tag: 'programming'
    })

    const response = await client.get('/cards')

    response.assertStatus(200)

    const body = response.body()
    const found = body.find((item: any) => item.id === card.id)

    assert.equal(found.id, card.id)
    assert.equal(found.question, 'What is Clean Code?')
  })

  test('should filter cards via query parameters and return only the matching ID', async ({ client, assert }) => {
    const cardMatch = await Card.create({
      question: 'Match?',
      answer: 'Yes',
      category: CategoryNumbers.FIRST,
      tag: 'target'
    })

    const cardOther = await Card.create({
      question: 'Other?',
      answer: 'No',
      category: CategoryNumbers.FIRST,
      tag: 'other'
    })

    const response = await client.get('/cards').qs({ tags: 'target' })

    response.assertStatus(200)
    const body = response.body()

    const ids = body.map((c: any) => c.id)
    assert.include(ids, cardMatch.id)
    assert.notInclude(ids, cardOther.id)
  })

  test('should filter cards by categories and return only the matching ID', async ({ client, assert }) => {
    const cardMatch = await Card.create({
      question: 'Match?',
      answer: 'Yes',
      category: CategoryNumbers.FIRST,
      tag: 'target'
    })

    const cardOther = await Card.create({
      question: 'Other?',
      answer: 'No',
      category: CategoryNumbers.FIRST,
      tag: 'other'
    })

    const response = await client.get('/cards').qs({ categories: 'FIRST', tags: 'other' })

    response.assertStatus(200)
    const body = response.body()

    const ids = body.map((c: any) => c.id)
    assert.include(ids, cardMatch.id)
    assert.include(ids, cardOther.id)
  })

  test('should filter cards via multiple tags and return only the matching ID', async ({ client, assert }) => {
    const cardMatch = await Card.create({
      question: 'Match?',
      answer: 'Yes',
      category: CategoryNumbers.FIRST,
      tag: 'target'
    })

    const cardOther = await Card.create({
      question: 'Other?',
      answer: 'No',
      category: CategoryNumbers.FIRST,
      tag: 'other'
    })

    const response = await client.get('/cards').qs({ tags: ['target', 'other'] })

    response.assertStatus(200)
    const body = response.body()

    const ids = body.map((c: any) => c.id)
    assert.include(ids, cardMatch.id)
    assert.include(ids, cardOther.id)
  })

  test('should return 422 when providing invalid data types', async ({ client, assert }) => {

    const response = await client.get('/cards').qs({
      tags: { unexpected: 'object' }
    })

    response.assertStatus(422)

    const body = response.body()
    assert.property(body, 'errors')
    assert.isArray(body.errors)
    assert.isNotEmpty(body.errors)
  })

})
