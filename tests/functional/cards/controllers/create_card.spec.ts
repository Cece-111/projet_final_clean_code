import { test } from '@japa/runner'
import testUtils from "@adonisjs/core/services/test_utils"
import Card from "#models/card"

test.group('Cards controllers - Create Card (Minimalist API)', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('should create a card and return 201 with success description', async ({ client, assert }) => {
    const payload = {
      question: "What is pair programming ?",
      answer: "A practice to work in pair on same computer.",
      tag: "Teamwork"
    }

    const response = await client.post('/cards').json(payload)

    response.assertStatus(201)

    response.assertBody({
      description: "Created card"
    })

    const cardInDb = await Card.findByOrFail('question', payload.question)
    assert.exists(cardInDb)
    assert.equal(cardInDb.tag, "Teamwork")
  })

  test('should return 400 without body when validation fails', async ({ client }) => {
    const payload = {
      answer: "No question here",
      tag: "Error"
    }

    const response = await client.post('/cards').json(payload)

    response.assertStatus(400)
  })

  test('should return 400 when body is totally empty', async ({ client }) => {
    const response = await client.post('/cards').json({})
    response.assertStatus(400)
  })
})
