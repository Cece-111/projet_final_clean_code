import {createCardDto} from "../DTO/createCardDto.js";
import Card from "#models/card";
import {CardEntity} from "../domain/cardEntity.js";
import {CardMapper} from "../mappers/CardMapper.js";

export class CardRepository {
  async create(payload: createCardDto): Promise<CardEntity> {
    const cardDb = await Card.create(payload)
    return CardMapper.toEntity(cardDb)
  }
}
