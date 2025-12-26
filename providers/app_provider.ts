import { ApplicationService } from '@adonisjs/core/types'
import {CreateCardService} from "../app/modules/cards/application/contracts/create.card.service";
import {CardWriteRepository} from "../app/modules/cards/domain/contracts/card.write.repository";
import {CardReadRepository} from "../app/modules/cards/domain/contracts/card.read.repository";
import {IndexCardService} from "../app/modules/cards/application/contracts/index.card.service";
import {ValidateCard} from "../app/modules/cards/application/services/validate.card";
import {ValidateCardService} from "../app/modules/cards/application/contracts/validate.card.service";
import {GetQuizzCardsService} from "../app/modules/quizz/cards/application/contracts/get.quizz.cards.service";
import {QuizzCardReadRepository} from "../app/modules/quizz/cards/domain/contracts/quizz.card.read.repository";

export default class AppProvider {
  constructor(protected app: ApplicationService) {}

  public async register() {
    const {IndexCard} = await import("../app/modules/cards/application/services/index.card");
    const {CreateCard} = await import("../app/modules/cards/application/services/create.card");
    const {CardRepositoryImplementation} = await import("../app/modules/cards/infrastructure/database/repositories/card.repository.implementation");
    const {GetQuizzCards} = await import("../app/modules/quizz/cards/application/services/get.quizz.cards")

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
