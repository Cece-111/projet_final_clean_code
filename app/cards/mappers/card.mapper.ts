import Card from "#models/card";
import {CardEntity} from "#cards/domain/card.entity";
import {CardFilters} from "#cards/contracts/card.filters";

export class CardMapper {
  static toEntity(model: Card): CardEntity {
    return CardEntity.fromPersistence(
      model.id,
      model.question,
      model.answer,
      model.category,
      model.tag,
      model.lastAnsweredDate?.toJSDate() ?? null
    )
  }

  static toColumnName: Record<keyof CardFilters, string> = {
    tags: 'tag',
    categories: 'category'
  }

}
