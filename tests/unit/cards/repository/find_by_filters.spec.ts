import { test } from '@japa/runner'
import testUtils from "@adonisjs/core/services/test_utils";
import { CategoryNumbers } from "../../../../app/categories/enums/categoryNumbers.js";
import { CardRepository } from "../../../../app/cards/repositories/cardRepository.js";
import Card from "#models/card";

test.group('Cards repository find by filters', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  const seedDatabase = async () => {
    await Card.createMany([
      {
        question: 'how are you?',
        answer: 'fine and you ?',
        category: CategoryNumbers.FIRST,
        tag: "english",
      },
      {
        question: 'comment ça va ?',
        answer: 'ça va et toi ?',
        category: CategoryNumbers.FIRST,
        tag: "french",
      },
      {
        question: '¿cómo estás?',
        answer: 'bien y tú?',
        category: CategoryNumbers.SECOND,
        tag: "spanish",
      }
    ])
  }

  test('should return all cards when no filters are provided', async ({ assert }) => {
    const cardRepository = new CardRepository()
    await seedDatabase()

    const allCards = await cardRepository.findByFilters({})
    assert.equal(allCards.length, 3)
  })

  test('should filter cards by a single tag', async ({ assert }) => {
    const cardRepository = new CardRepository()
    await seedDatabase()

    const results = await cardRepository.findByFilters({ tags: ['english'] })

    assert.equal(results.length, 1)
    assert.equal(results[0].snapshot().tag, "english")
  })

  test('should filter cards by multiple tags (OR logic)', async ({ assert }) => {
    const cardRepository = new CardRepository()
    await seedDatabase()

    const results = await cardRepository.findByFilters({ tags: ['english', 'french'] })

    assert.equal(results.length, 2)
    const tags = results.map(r => r.snapshot().tag)
    assert.containSubset(tags, ['english', 'french'])
  })

  test('should filter cards using both tags and categories (OR logic)', async ({ assert }) => {
    const cardRepository = new CardRepository()
    await seedDatabase()

    const results = await cardRepository.findByFilters({
      tags: ['spanish'],
      categories: [CategoryNumbers.FIRST]
    })

    assert.equal(results.length, 3)
    const tags = results.map(r => r.snapshot().tag)
    assert.containSubset(tags, ['english', 'french', 'spanish'])
  })
})
