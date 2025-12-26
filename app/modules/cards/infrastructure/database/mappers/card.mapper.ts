import Card from "#models/card";
import {CardEntity} from "#app/modules/cards/domain/card.entity";
import {CardFilters} from "#app/modules/cards/domain/contracts/card.filters";

export class CardMapper {
  static toEntity(model: Card): CardEntity {
    return CardEntity.fromPersistence(
      model.id,
      model.question,
      model.answer,
      model.category,
      model.tag,
      model.nextReviewDate ? model.nextReviewDate.toJSDate() : null,
    )
  }

  static toColumnName: Record<keyof CardFilters, string> = {
    tags: 'tag',
    categories: 'category',
  }

}
