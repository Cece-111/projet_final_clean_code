import { test } from '@japa/runner'
import { CategoryNumbers } from "#app/modules/categories/enums/category.numbers"
import { CardReadRepository } from "#app/modules/cards/domain/contracts/card.read.repository"
import { CardWriteRepository } from "#app/modules/cards/domain/contracts/card.write.repository"
import { CardEntity } from "#app/modules/cards/domain/card.entity"
import { ValidateCard } from "#app/modules/cards/application/services/validate.card"
import { CardFilters } from '#app/modules/cards/domain/contracts/card.filters'

test.group('ValidateCardService (Unit)', () => {

  class FakeReadRepository extends CardReadRepository {
    constructor(public card: CardEntity | null = null) { super() }

    async findById(_id: string): Promise<CardEntity> {
      if (!this.card) throw new Error('Card not found')
      return this.card
    }

    async findByFilters(_: CardFilters): Promise<CardEntity[]> { return [] }
  }

  class FakeWriteRepository extends CardWriteRepository {
    public lastSavedCard: CardEntity | null = null

    async save(card: CardEntity): Promise<void> {
      this.lastSavedCard = card
    }
    async create(card: CardEntity): Promise<CardEntity> { return card }
  }


  test('should move card to next category and save when answer is valid', async ({ assert }) => {
    const cardId = 'uuid-123'
    const entity = CardEntity.fromPersistence(
      cardId, 'Question', 'Answer', CategoryNumbers.FIRST, 'tag', new Date()
    )

    const readRepo = new FakeReadRepository(entity)
    const writeRepo = new FakeWriteRepository()
    const service = new ValidateCard(writeRepo, readRepo)

    await service.validate(cardId, true)

    const savedCard = writeRepo.lastSavedCard?.snapshot()
    assert.equal(savedCard?.category, CategoryNumbers.SECOND)
    assert.isNotNull(savedCard?.nextReviewDate)
  })

  test('should reset card to FIRST category when answer is invalid', async ({ assert }) => {
    const cardId = 'uuid-456'
    const entity = CardEntity.fromPersistence(
      cardId, 'Q', 'A', CategoryNumbers.SECOND, 'tag', new Date()
    )

    const readRepo = new FakeReadRepository(entity)
    const writeRepo = new FakeWriteRepository()
    const service = new ValidateCard(writeRepo, readRepo)

    await service.validate(cardId, false)

    assert.equal(writeRepo.lastSavedCard?.snapshot().category, CategoryNumbers.FIRST)
  })

  test('should move card to DONE when moving past category SEVEN', async ({ assert }) => {
    const cardId = 'uuid-789'
    const entity = CardEntity.fromPersistence(
      cardId, 'Q', 'A', CategoryNumbers.SEVENTH, 'tag', new Date()
    )

    const readRepo = new FakeReadRepository(entity)
    const writeRepo = new FakeWriteRepository()
    const service = new ValidateCard(writeRepo, readRepo)

    await service.validate(cardId, true)

    assert.equal(writeRepo.lastSavedCard?.snapshot().category, CategoryNumbers.DONE)
    assert.isNull(writeRepo.lastSavedCard?.snapshot().nextReviewDate)
  })
})
