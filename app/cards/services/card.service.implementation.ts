import {inject} from "@adonisjs/core";
import {createCardDto} from "../dto/create.card.dto.js";
import { CardRepository } from "../contracts/card.repository.js";
import {CardEntity} from "#cards/domain/card.entity";
import {CardFilters} from "#cards/contracts/card.filters";
import {CardService} from "#cards/contracts/card.service";
import {CategoryNumbers} from "#app/categories/enums/category.numbers";
import {CATEGORY_FREQUENCY_MAP} from "#cards/services/card.frequency";

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

  async getCardsForQuizz(date: Date): Promise<CardEntity[]> {
    const cards = await this.cardRepository.findByFilters({})
    return cards.filter(card => {
      const snapshot = card.snapshot()
      if (snapshot.category === CategoryNumbers.DONE) {
        return false
      }
      if (!snapshot.lastAnsweredDate) {
        return true
      }
      const frequency = CATEGORY_FREQUENCY_MAP[snapshot.category]
      const diffTime = date.getTime() - snapshot.lastAnsweredDate.getTime()
      const diffDays = diffTime / (1000 * 3600 * 24)
      return diffDays >= frequency
    })
  }

  async validate(cardId: string, isValid: boolean): Promise<void> {
    const card = await this.cardRepository.findById(cardId);
    if (isValid) {
      card.moveNextCategory();
    } else {
      card.resetToFirstCategory();
    }
    card.markAsAnswered(new Date())

    await this.cardRepository.save(card);
  }
}
