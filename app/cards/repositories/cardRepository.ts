import Card from "#models/card";
import {CardEntity} from "../domain/cardEntity.js";
import {CardMapper} from "../mappers/CardMapper.js";
import {CardFilters} from "../contracts/cardFilters.js";

export class CardRepository {
  async create(card: CardEntity): Promise<CardEntity> {
    const data = card.snapshot()
    const cardDb = await Card.create(data)
    return CardMapper.toEntity(cardDb)
  }

  async findByFilters(filters: CardFilters): Promise<CardEntity[]> {
    const query = Card.query()
    for (const [key, values] of Object.entries(filters)) {
      const columnName = CardMapper.toCardFiltersFields [key as keyof CardFilters]
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
