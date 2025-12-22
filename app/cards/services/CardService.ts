import {inject} from "@adonisjs/core";
import {CardRepository} from "../repositories/cardRepository.js";
import {createCardDto} from "../dto/createCardDto.js";
import {CardEntity} from "../domain/cardEntity.js";
import {CardFilters} from "../../contracts/cardFilters.js";

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

  async getCards(filters: CardFilters) {
    return this.cardRepository.findByFilters(filters)
  }
}
