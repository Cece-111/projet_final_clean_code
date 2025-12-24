import Card from "#models/card";
import {CardEntity} from "#cards/domain/card.entity";

import {CardWriteRepository} from "#cards/domain/contracts/card.write.repository";
import {CardReadRepository} from "#cards/domain/contracts/card.read.repository";
import {CardFilters} from "#cards/domain/contracts/card.filters";
import {CardMapper} from "#cards/infrastructure/database/mappers/card.mapper";

export class CardRepositoryImplementation implements CardWriteRepository, CardReadRepository {
  async create(card: CardEntity): Promise<CardEntity> {
    const data = card.snapshot()
    const cardDb = await Card.create(data)
    return CardMapper.toEntity(cardDb)
  }

  async findByFilters(filters: CardFilters): Promise<CardEntity[]> {
    const query = Card.query()
    for (const [filterName, values] of Object.entries(filters)) {
      const columnName = CardMapper.toColumnName [filterName as keyof CardFilters]
      if (values.length > 0) {
        query.orWhereIn(columnName, values)
      }
    }
    const cards = await query
    return cards.map(CardMapper.toEntity)
  }

  async findById(id: string): Promise<CardEntity> {
    const cardDb = await Card.findOrFail(id)
    return CardEntity.fromPersistence(
      cardDb.id,
      cardDb.question,
      cardDb.answer,
      cardDb.category ,
      cardDb.tag
    )
  }

  async save(card: CardEntity): Promise<void> {
    const data = card.snapshot()
    await Card.updateOrCreate({ id: data.id }, data)
  }
}
