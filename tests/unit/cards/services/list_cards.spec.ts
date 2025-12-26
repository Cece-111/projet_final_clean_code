import { test } from '@japa/runner'
import { CardReadRepository } from '../../../../app/modules/cards/domain/contracts/card.read.repository'
import { IndexCard } from "../../../../app/modules/cards/application/services/index.card"
import { CardEntity } from '../../../../app/modules/cards/domain/card.entity'
import { CardFilters } from '../../../../app/modules/cards/domain/contracts/card.filters'

test.group('IndexCard Service (Unit)', () => {

  class MemoryReadRepository extends CardReadRepository {
    public lastFiltersUsed: CardFilters | null = null

    async findByFilters(filters: CardFilters): Promise<CardEntity[]> {
      this.lastFiltersUsed = filters
      return []
    }

    async findById(_id: string): Promise<CardEntity> {
      throw new Error('Not used in this test')
    }
  }

  test('should pass filters to read repository when fetching cards', async ({ assert }) => {
    const readRepo = new MemoryReadRepository()
    const service = new IndexCard(readRepo)
    const inputFilters = { tags: ['svt', 'maths'], categories: [] }

    await service.index(inputFilters)

    assert.deepEqual(readRepo.lastFiltersUsed, inputFilters)
  })
})
