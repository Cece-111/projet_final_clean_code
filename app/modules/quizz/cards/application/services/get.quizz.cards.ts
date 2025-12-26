import {inject} from "@adonisjs/core";
import {CardEntity} from "#app/modules/cards/domain/card.entity";
import {GetQuizzCardsService} from "#app/modules/quizz/cards/application/contracts/get.quizz.cards.service";
import {QuizzCardReadRepository} from "#app/modules/quizz/cards/domain/contracts/quizz.card.read.repository";

@inject()
export class GetQuizzCards implements GetQuizzCardsService {
  constructor(
    private cardRepository: QuizzCardReadRepository
  ) {}

  async getCardsForQuizz(date: Date): Promise<CardEntity[]> {
    const searchDate = new Date(date)
    searchDate.setHours(0, 0, 0, 0)
    return await this.cardRepository.findQuizzCards(searchDate)
  }
}
