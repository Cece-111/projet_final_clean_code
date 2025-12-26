import { test } from '@japa/runner'
import { CategoryNumbers } from "../../../../app/modules/categories/enums/category.numbers"
import { CardReadRepository } from "../../../../app/modules/cards/domain/contracts/card.read.repository"
import { CardWriteRepository } from "../../../../app/modules/cards/domain/contracts/card.write.repository"
import { CardEntity } from "../../../../app/modules/cards/domain/card.entity"
import { ValidateCard } from "../../../../app/modules/cards/application/services/validate.card"
import { CardFilters } from '../../../../app/modules/cards/domain/contracts/card.filters'

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
    const entity = CardEntity.fromPersistence(
      cardId, 'Question', 'Answer', CategoryNumbers.FIRST, 'tag', null
    )

    const readRepo = new FakeReadRepository(initialEntity)
    const writeRepo = new FakeWriteRepository()
    const service = new ValidateCard(writeRepo, readRepo)

    await service.validate(cardId, true)

    assert.isTrue(findByIdStub.calledWith(cardId))

    assert.equal(entity.snapshot().category, CategoryNumbers.SECOND)
    assert.isNotNull(entity.snapshot().lastAnsweredDate)
    assert.isTrue(saveStub.calledWith(entity))
  })

  test('should move card to previous category (FIRST) if currently SECOND when answer is invalid', async ({ assert }) => {
    const cardId = 'uuid-456'
    const entity = CardEntity.fromPersistence(
      cardId, 'Q', 'A', CategoryNumbers.SECOND, 'tag', null
    )

    const readRepo = new FakeReadRepository(initialEntity)
    const writeRepo = new FakeWriteRepository()
    const service = new ValidateCard(writeRepo, readRepo)

    await service.validate(cardId, false)

    assert.equal(writeRepo.lastSavedCard?.snapshot().category, CategoryNumbers.FIRST)
  })

  test('should move card to previous category (SECOND) if currently THIRD when answer is invalid', async ({ assert }) => {
    const cardId = 'uuid-789'
    const entity = CardEntity.fromPersistence(
      cardId, 'Q', 'A', CategoryNumbers.THIRD, 'tag', null
    )

    const findByIdStub = sinon.stub().resolves(entity)
    const saveStub = sinon.stub().resolves()

    const repoMock = {
      findById: findByIdStub,
      save: saveStub
    } as unknown as CardRepository

    const service = new CardServiceImplementation(repoMock)

    await service.validate(cardId, false)

    assert.equal(entity.snapshot().category, CategoryNumbers.SECOND)
    assert.isTrue(saveStub.calledWith(entity))
  })
})
