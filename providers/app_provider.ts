import { ApplicationService } from '@adonisjs/core/types'

export default class AppProvider {
  constructor(protected app: ApplicationService) {}

  public async register() {
    const { CardRepository } = await import('#cards/contracts/card.repository')
    const { CardRepositoryImplementation } = await import('#cards/repositories/card.repository.implementation')
    const { CardService } = await import('#cards/contracts/card.service')
    const { CardServiceImplementation } = await import('#cards/services/card.service.implementation')

    this.app.container.bind(CardRepository, () => {
      return this.app.container.make(CardRepositoryImplementation)
    })

    this.app.container.bind(CardService, () => {
      return this.app.container.make(CardServiceImplementation)
    })
  }
}
