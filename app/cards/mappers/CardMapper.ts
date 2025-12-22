import Card from "#models/card";
import {CardEntity} from "../domain/cardEntity.js";
import {CardFilters} from "../../contracts/cardFilters.js";

export class CardMapper {
  static toEntity(model: Card): CardEntity {
    return CardEntity.fromPersistence(
      model.id,
      model.question,
      model.answer,
      model.category,
      model.tag
    )
  }

  static toFiltersCard: Record<keyof CardFilters, string> = {
    tags: 'tag',
    categories: 'category'
  }
}
