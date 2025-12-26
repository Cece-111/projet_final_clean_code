import Card from "#models/card";
import {CardEntity} from "#app/modules/cards/domain/card.entity";
import {DateTime} from "luxon";

import {CardWriteRepository} from "#app/modules/cards/domain/contracts/card.write.repository";
import {CardReadRepository} from "#app/modules/cards/domain/contracts/card.read.repository";
import {CardFilters} from "#app/modules/cards/domain/contracts/card.filters";
import {CardMapper} from "#app/modules/cards/infrastructure/database/mappers/card.mapper";
import {QuizzCardReadRepository} from "#app/modules/quizz/cards/domain/contracts/quizz.card.read.repository";

export class CardRepositoryImplementation implements CardWriteRepository, CardReadRepository, QuizzCardReadRepository {
  async create(card: CardEntity): Promise<CardEntity> {
    const data = card.snapshot()
    const cardDb = await Card.create({
      question: data.question,
      answer: data.answer,
      category: data.category,
      tag: data.tag,
      lastAnsweredDate: data.lastAnsweredDate ? DateTime.fromJSDate(data.lastAnsweredDate) : null,
      nextReviewDate: DateTime.fromJSDate(data.nextReviewDate)
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
      cardDb.lastAnsweredDate?.toJSDate() ?? null,
      cardDb.nextReviewDate?.toJSDate() ?? new Date()
    )
  }

  async save(card: CardEntity): Promise<void> {
    const data = card.snapshot()
    await Card.updateOrCreate({ id: data.id }, {
      question: data.question,
      answer: data.answer,
      category: data.category,
      tag: data.tag,
      lastAnsweredDate: data.lastAnsweredDate ? DateTime.fromJSDate(data.lastAnsweredDate) : null,
      nextReviewDate : DateTime.fromJSDate(data.nextReviewDate)
    })
  }

  async findDueCards(date: Date): Promise<CardEntity[]> {
    const cards = await Card.query().where('last_answered_date', date)
    return cards.map(CardMapper.toEntity)
  }
}
