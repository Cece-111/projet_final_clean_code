import { test } from '@japa/runner'
import sinon from 'sinon'
import {CardRepository} from "../../../../app/cards/repositories/cardRepository.js";
import CardService from "../../../../app/cards/services/CardService.js";

test.group('Card Service (Unit)', (group) => {
  group.each.teardown(() => {
    sinon.restore()
  })

  test('should format empty filters before calling repository', async ({ assert }) => {
    const repo = new CardRepository()
    const findByFiltersMock = sinon.stub(repo, 'findByFilters').resolves([])
    const service = new CardService(repo)

    await service.getCards({})

    const args = findByFiltersMock.firstCall.args[0]
    assert.deepEqual(args, {})
  })

  test('should pass tags to repository when provided', async ({ assert }) => {
    const repo = new CardRepository()
    const findByFiltersMock = sinon.stub(repo, 'findByFilters').resolves([])
    const service = new CardService(repo)

    const inputFilters = {
      tags: ['svt', 'maths']
    }
    await service.getCards(inputFilters)

    const args = findByFiltersMock.firstCall.args[0]
    assert.deepEqual(args, {
      tags: ['svt', 'maths']
    })
  })
})
