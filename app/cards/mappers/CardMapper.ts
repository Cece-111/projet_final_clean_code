import Card from "#models/card";
import {CardEntity} from "../domain/cardEntity.js";

export class CardMapper {
  static toEntity(model: Card) {
    return new CardEntity(
      model.id,
      model.question,
      model.answer,
      model.category,
      model.tag
    )
  }
}
