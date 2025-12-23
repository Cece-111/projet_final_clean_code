import { test } from '@japa/runner'
import sinon from 'sinon'
import { CardRepository } from '#cards/contracts/card.repository'
import {CardServiceImplementation} from "#cards/services/card.service.implementation";

test.group('Card Service (Unit)', (group) => {
  group.each.teardown(() => {
    sinon.restore()
  })

  test('should pass tags to repository when provided', async ({ assert }) => {
    /**
     * On crée un objet anonyme qui "fait office" de CardRepository.
     * Pas besoin d'instancier la vraie classe.
     */
    const repoMock = {
      findByFilters: sinon.stub().resolves([]),
      create: sinon.stub(),
      findById: sinon.stub(),
      save: sinon.stub()
    } as unknown as CardRepository

    const service = new CardServiceImplementation(repoMock)

    const inputFilters = { tags: ['svt', 'maths'] }
    await service.getCards(inputFilters)

    assert.isTrue((repoMock.findByFilters as sinon.SinonStub).calledWith(inputFilters))
  })
})
