import {inject} from "@adonisjs/core";
import {createCardDto} from "../dto/create.card.dto.js";
import { CardRepository } from "../contracts/card.repository.js";
import {CardEntity} from "#cards/domain/card.entity";
import {CardFilters} from "#cards/contracts/card.filters";
import {CardService} from "#cards/contracts/card.service";

@inject()
export class CardServiceImplementation implements CardService {
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

  async getCards(filters: CardFilters): Promise<CardEntity[]> {
    return this.cardRepository.findByFilters(filters)
  }

  async validate(cardId: string, isValid: boolean): Promise<void> {
    const card = await this.cardRepository.findById(cardId);
    if (isValid) {
      card.moveNextCategory();
    } else {
      card.resetToFirstCategory();
    }

    await this.cardRepository.save(card);
  }
}
