import { test } from '@japa/runner'
import {CardWriteRepository} from "../../../../app/modules/cards/domain/contracts/card.write.repository";
import {CardEntity} from "../../../../app/modules/cards/domain/card.entity";
import {CreateCard} from "../../../../app/modules/cards/application/services/create.card";
import {CategoryNumbers} from "../../../../app/modules/categories/enums/category.numbers";

test.group('Cards services create', () => {

  class MemoryCardRepository extends CardWriteRepository {
    public cards: CardEntity[] = []

    async create(card: CardEntity): Promise<CardEntity> {
      this.cards.push(card)
      return card
    }

    async save(_: CardEntity): Promise<void> {
      return
    }
  }

  test('should correctly transform DTO into Entity and persist it', async ({ assert }) => {
    const repository = new MemoryCardRepository()
    const service = new CreateCard(repository)
    const dto = {
      question: 'What is DDD?',
      answer: 'Domain Driven Design',
      tag: 'Software Architecture'
    }

    const result = await service.create(dto)

    assert.equal(repository.cards.length, 1, 'Repository should have saved one card')

    assert.equal(result.snapshot().question, dto.question)
    assert.equal(result.snapshot().tag, dto.tag)

    assert.equal(result.snapshot().category, CategoryNumbers.FIRST, 'New cards must start in category 1')
  })

  test('should return the entity created by the domain', async ({ assert }) => {
    const repository = new MemoryCardRepository()
    const service = new CreateCard(repository)

    const result = await service.create({ question: 'q', answer: 'a', tag: 't' })

    assert.isTrue(result instanceof CardEntity)  })
})
