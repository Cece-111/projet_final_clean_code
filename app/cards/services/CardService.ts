import {inject} from "@adonisjs/core";
import {CardRepository} from "../repositories/card_repository.js";
import {createCardDto} from "../DTO/createCardDto.js";
import {CardEntity} from "../domain/cardEntity.js";

@inject()
export default class CardService {

  constructor(
    private cardRepository: CardRepository
  ) {}
    async create(payload: createCardDto): Promise<CardEntity> {
      const card = CardEntity.create(
        payload.question,
        payload.answer,
        payload.tag
      )

      return this.cardRepository.create(card)
    }
}
