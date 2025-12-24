import { test } from '@japa/runner'
import testUtils from "@adonisjs/core/services/test_utils"
import Card from "#models/card"
import {CardRepositoryImplementation} from "../../../../app/cards/infrastructure/database/repositories/card.repository.implementation";
import {CategoryNumbers} from "#app/categories/enums/category.numbers";

test.group('Cards repository find by filters', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('should return exactly the cards created when no filters are provided', async ({ assert }) => {
    const cardRepository = new CardRepositoryImplementation()

    const card1 = await Card.create({ question: 'Q1', answer: 'A1', category: CategoryNumbers.FIRST, tag: "t1" })
    const card2 = await Card.create({ question: 'Q2', answer: 'A2', category: CategoryNumbers.FIRST, tag: "t2" })

    const results = await cardRepository.findByFilters({})
    const resultIds = results.map(r => r.snapshot().id)

    assert.include(resultIds, card1.id)
    assert.include(resultIds, card2.id)
  })

  test('should filter cards by a single tag (isolated by ID)', async ({ assert }) => {
    const cardRepository = new CardRepositoryImplementation()

    const cardEnglish = await Card.create({
      question: 'how are you?',
      answer: 'fine',
      category: CategoryNumbers.FIRST,
      tag: "english",
    })

    const cardFrench = await Card.create({
      question: 'comment ça va ?',
      answer: 'bien',
      category: CategoryNumbers.FIRST,
      tag: "french",
    })

    const results = await cardRepository.findByFilters({ tags: ['english'] })
    const resultIds = results.map(r => r.snapshot().id)

    assert.include(resultIds, cardEnglish.id)
    assert.notInclude(resultIds, cardFrench.id)
  })

  test('should filter cards by multiple tags (OR logic)', async ({ assert }) => {
    const cardRepository = new CardRepositoryImplementation()

    const c1 = await Card.create({ question: 'Q1', answer: 'A1', category: CategoryNumbers.FIRST, tag: "js" })
    const c2 = await Card.create({ question: 'Q2', answer: 'A2', category: CategoryNumbers.FIRST, tag: "ts" })
    const c3 = await Card.create({ question: 'Q3', answer: 'A3', category: CategoryNumbers.FIRST, tag: "php" })

    const results = await cardRepository.findByFilters({ tags: ['js', 'ts'] })
    const resultIds = results.map(r => r.snapshot().id)

    assert.include(resultIds, c1.id)
    assert.include(resultIds, c2.id)
    assert.notInclude(resultIds, c3.id)
  })

  test('should filter cards using both tags and categories (OR logic)', async ({ assert }) => {
    const cardRepository = new CardRepositoryImplementation()

    const c1 = await Card.create({ question: 'Q1', answer: 'A1', category: CategoryNumbers.SECOND, tag: "match_tag" })
    const c2 = await Card.create({ question: 'Q2', answer: 'A2', category: CategoryNumbers.FIRST, tag: "no_match" })
    const c3 = await Card.create({ question: 'Q3', answer: 'A3', category: CategoryNumbers.SECOND, tag: "no_match" })

    const results = await cardRepository.findByFilters({
      tags: ['match_tag'],
      categories: [CategoryNumbers.FIRST]
    })

    const resultIds = results.map(r => r.snapshot().id)

    assert.include(resultIds, c1.id)
    assert.include(resultIds, c2.id)
    assert.notInclude(resultIds, c3.id)
  })
})
