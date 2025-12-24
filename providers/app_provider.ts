import { ApplicationService } from '@adonisjs/core/types'
import {CreateCardService} from "#cards/application/contracts/create.card.service";
import {CardWriteRepository} from "#cards/domain/contracts/card.write.repository";
import {CardReadRepository} from "#cards/domain/contracts/card.read.repository";
import {IndexCardService} from "#cards/application/contracts/index.card.service";
import {ValidateCard} from "#cards/application/services/validate.card";
import {ValidateCardService} from "#cards/application/contracts/validate.card.service";

export default class AppProvider {
  constructor(protected app: ApplicationService) {}

  public async register() {
    const {IndexCard} = await import("#cards/application/services/index.card");
    const {CreateCard} = await import("#cards/application/services/create.card");
    const {CardRepositoryImplementation} = await import("#cards/infrastructure/database/repositories/card.repository.implementation");

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
  }
}
