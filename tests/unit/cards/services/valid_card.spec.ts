import { test } from '@japa/runner'
import { CategoryNumbers } from "#app/categories/enums/category.numbers"
import { CardReadRepository } from "#cards/domain/contracts/card.read.repository"
import { CardWriteRepository } from "#cards/domain/contracts/card.write.repository"
import { CardEntity } from "#cards/domain/card.entity"
import { ValidateCard } from "#cards/application/services/validate.card"
import { CardFilters } from '#app/cards/domain/contracts/card.filters'

test.group('ValidateCardService (Unit)', () => {

  class FakeReadRepository extends CardReadRepository {
    findByFilters(_: CardFilters): Promise<CardEntity[]> {
        throw new Error('Method not implemented.')
    }
    constructor(public card: CardEntity | null = null) {
      super()
    }
    async findById(_id: string): Promise<CardEntity> {
      if (!this.card) throw new Error('Card not found')
      return this.card
    }
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
    const initialEntity = CardEntity.fromPersistence(
      cardId, 'Question', 'Answer', CategoryNumbers.FIRST, 'tag'
    )

    const readRepo = new FakeReadRepository(initialEntity)
    const writeRepo = new FakeWriteRepository()
    const service = new ValidateCard(writeRepo, readRepo)

    await service.validate(cardId, true)

    assert.equal(writeRepo.lastSavedCard?.snapshot().category, CategoryNumbers.SECOND)
    assert.equal(writeRepo.lastSavedCard?.snapshot().id, cardId)
  })

  test('should reset card to FIRST category and save when answer is invalid', async ({ assert }) => {
    const cardId = 'uuid-456'
    const initialEntity = CardEntity.fromPersistence(
      cardId, 'Q', 'A', CategoryNumbers.SECOND, 'tag'
    )

    const readRepo = new FakeReadRepository(initialEntity)
    const writeRepo = new FakeWriteRepository()
    const service = new ValidateCard(writeRepo, readRepo)

    await service.validate(cardId, false)

    assert.equal(writeRepo.lastSavedCard?.snapshot().category, CategoryNumbers.FIRST)
  })
})
