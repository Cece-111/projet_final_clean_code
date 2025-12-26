import {inject} from "@adonisjs/core";
import {CardEntity} from "#app/modules/cards/domain/card.entity";
import {CategoryNumbers} from "#app/modules/categories/enums/category.numbers";
import {GetQuizzCardsService} from "#app/modules/quizz/cards/application/contracts/get.quizz.cards.service";
import {CardReadRepository} from "#app/modules/cards/domain/contracts/card.read.repository";
import {CATEGORY_FREQUENCY_MAP} from "#app/modules/categories/mappers/category.frequency.mapper";

@inject()
export class GetQuizzCards implements GetQuizzCardsService {
  constructor(
    private cardRepository: CardReadRepository
  ) {}

  async getCardsForQuizz(date: Date): Promise<CardEntity[]> {
    const cards = await this.cardRepository.findByFilters({})
    //return QuizzEntity.create(cards, date)


    return cards.filter(card => {
      const snapshot = card.snapshot()
      if (snapshot.category === CategoryNumbers.DONE) {
        return false
      }
      if (!snapshot.lastAnsweredDate) {
        return true
      }
      const frequency = CATEGORY_FREQUENCY_MAP[snapshot.category]

      const currentDate = new Date(date);
      currentDate.setHours(0, 0, 0, 0);

      const lastDate = new Date(snapshot.lastAnsweredDate);
      lastDate.setHours(0, 0, 0, 0);

      const diffTime = currentDate.getTime() - lastDate.getTime();
      const diffDays = diffTime / (1000 * 3600 * 24);

      return diffDays >= frequency
    })

  }
}
