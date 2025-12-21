import Card from "#models/card";
import {CardEntity} from "../domain/cardEntity.js";
import {CardMapper} from "../mappers/CardMapper.js";

export class CardRepository {
  async create(card: CardEntity): Promise<CardEntity> {
    const data = card.snapshot()
    const cardDb = await Card.create(data)
    return CardMapper.toEntity(cardDb)
  }
}
