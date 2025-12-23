import { test } from '@japa/runner'
import sinon from 'sinon'
import { CardRepository } from '#cards/contracts/card.repository'
import { CardServiceImplementation } from "#cards/services/card.service.implementation"
import { CardEntity } from "#cards/domain/card.entity"
import {CategoryNumbers} from "#app/categories/enums/category.numbers";

test.group('Card Service - validate (Unit)', (group) => {
  group.each.teardown(() => {
    sinon.restore()
  })

  test('should move card to next category and save when answer is valid', async ({ assert }) => {
    // 1. Arrange
    const cardId = 'uuid-123'
    const entity = CardEntity.fromPersistence(
      cardId, 'Question', 'Answer', CategoryNumbers.FIRST, 'tag'
    )

    const findByIdStub = sinon.stub().resolves(entity)
    const saveStub = sinon.stub().resolves()

    const repoMock = {
      findById: findByIdStub,
      save: saveStub
    } as unknown as CardRepository

    const service = new CardServiceImplementation(repoMock)

    // 2. Act
    await service.validate(cardId, true)

    // 3. Assert
    // On vérifie que le repo a bien été appelé avec le bon ID
    assert.isTrue(findByIdStub.calledWith(cardId))

    // On vérifie que l'entité a changé de catégorie (FIRST -> SECOND)
    assert.equal(entity.snapshot().category, CategoryNumbers.SECOND)

    // On vérifie que la version modifiée de l'entité a été sauvegardée
    assert.isTrue(saveStub.calledWith(entity))
  })

  test('should reset card to FIRST category and save when answer is invalid', async ({ assert }) => {
    // 1. Arrange
    // On part d'une carte qui est déjà en catégorie SECOND
    const cardId = 'uuid-456'
    const entity = CardEntity.fromPersistence(
      cardId, 'Q', 'A', CategoryNumbers.SECOND, 'tag'
    )

    const findByIdStub = sinon.stub().resolves(entity)
    const saveStub = sinon.stub().resolves()

    const repoMock = {
      findById: findByIdStub,
      save: saveStub
    } as unknown as CardRepository

    const service = new CardServiceImplementation(repoMock)

    // 2. Act
    await service.validate(cardId, false) // Réponse fausse

    // 3. Assert
    // L'entité doit être revenue en FIRST
    assert.equal(entity.snapshot().category, CategoryNumbers.FIRST)
    assert.isTrue(saveStub.calledWith(entity))
  })
})
