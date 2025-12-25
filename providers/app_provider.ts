import { ApplicationService } from '@adonisjs/core/types'
import {CreateCardService} from "#cards/application/contracts/create.card.service";
import {CardWriteRepository} from "#cards/domain/contracts/card.write.repository";
import {CardReadRepository} from "#cards/domain/contracts/card.read.repository";
import {IndexCardService} from "#cards/application/contracts/index.card.service";
import {ValidateCard} from "#cards/application/services/validate.card";
import {ValidateCardService} from "#cards/application/contracts/validate.card.service";
import {GetQuizzCardsService} from "#app/quizz/cards/application/contracts/get.quizz.cards.service";
import {QuizzCardReadRepository} from "#quizz/cards/domain/contracts/quizz.card.read.repository";

export default class AppProvider {
  constructor(protected app: ApplicationService) {}

  public async register() {
    const {IndexCard} = await import("#cards/application/services/index.card");
    const {CreateCard} = await import("#cards/application/services/create.card");
    const {CardRepositoryImplementation} = await import("#cards/infrastructure/database/repositories/card.repository.implementation");
    const {GetQuizzCards} = await import("#quizz/cards/application/services/get.quizz.cards")

    this.app.container.bind(QuizzCardReadRepository, () => {
      return this.app.container.make(CardRepositoryImplementation)
    })

    this.app.container.bind(CardWriteRepository, () => {
      return this.app.container.make(CardRepositoryImplementation)
    })

    this.app.container.bind(CardReadRepository, () => {
      return this.app.container.make(CardRepositoryImplementation)
    })

    this.app.container.bind(IndexCardService, () => {
      return this.app.container.make(IndexCard)
    })

    this.app.container.bind(CreateCardService, () => {
      return this.app.container.make(CreateCard)
    })

    this.app.container.bind(ValidateCardService, () => {
      return this.app.container.make(ValidateCard)
    })

    this.app.container.bind(GetQuizzCardsService, () => {
      return this.app.container.make(GetQuizzCards)
    })
  }
}
