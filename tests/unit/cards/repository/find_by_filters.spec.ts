import { test } from '@japa/runner'
import testUtils from "@adonisjs/core/services/test_utils";
import {CategoryNumbers} from "../../../../app/categories/enums/categoryNumbers.js";
import {CardRepository} from "../../../../app/cards/repositories/cardRepository.js";
import Card from "#models/card";

test.group('Cards repository find by filters', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())
  test('find by one or two filters', async ({ assert }) => {
    const cardRepository: CardRepository = new CardRepository()

    await Card.create({
      question: 'how are you?',
      answer: 'fine and you ?',
      category: CategoryNumbers.FIRST,
      tag: "english",
    })
    await Card.create({
      question: 'comment ça va ?',
      answer: 'ça va et toi ?',
      category: CategoryNumbers.FIRST,
      tag: "french",
    })
    await Card.create({
      question: '¿cómo estás?',
      answer: 'bien y tú?',
      category: CategoryNumbers.SECOND,
      tag: "spanish",
    })

    const allCards = await cardRepository.findByFilters({})
    assert.equal(allCards.length, 3)

    const filterByTag = await cardRepository.findByFilters({ tags: ['english'] })
    assert.equal(filterByTag.length, 1)
    assert.equal(filterByTag[0].snapshot().tag, "english")

    const filterByMultiple = await cardRepository.findByFilters({
      tags: ['english', 'french']
    })
    assert.equal(filterByMultiple.length, 2)
    assert.equal(filterByMultiple[0].snapshot().tag, "english")
    assert.equal(filterByMultiple[1].snapshot().tag, "french")

    const mixedFilter = await cardRepository.findByFilters({
      tags: ['spanish'],
      categories: [CategoryNumbers.FIRST]
    })
    assert.equal(mixedFilter.length, 3)
    assert.equal(mixedFilter[0].snapshot().tag, "english")
    assert.equal(mixedFilter[1].snapshot().tag, "french")
    assert.equal(mixedFilter[2].snapshot().tag, "spanish")

  })

})
