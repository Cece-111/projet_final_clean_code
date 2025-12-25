import Card from "#models/card";
import {CardRepository} from "../contracts/card.repository.js";
import {CardEntity} from "#cards/domain/card.entity";
import {CardFilters} from "#cards/contracts/card.filters";
import {CardMapper} from "#cards/mappers/card.mapper";
import {DateTime} from "luxon";

export class CardRepositoryImplementation implements CardRepository {
  async create(card: CardEntity): Promise<CardEntity> {
    const data = card.snapshot()
    const cardDb = await Card.create({
      question: data.question,
      answer: data.answer,
      category: data.category,
      tag: data.tag,
      lastAnsweredDate: data.lastAnsweredDate ? DateTime.fromJSDate(data.lastAnsweredDate) : null
    })
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
      cardDb.tag,
      cardDb.lastAnsweredDate?.toJSDate() ?? null
    )
  }

  async save(card: CardEntity): Promise<void> {
    const data = card.snapshot()
    await Card.updateOrCreate({ id: data.id }, {
      question: data.question,
      answer: data.answer,
      category: data.category,
      tag: data.tag,
      lastAnsweredDate: data.lastAnsweredDate ? DateTime.fromJSDate(data.lastAnsweredDate) : null
    })
  }
}
