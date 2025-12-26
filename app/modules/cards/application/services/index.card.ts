import {inject} from "@adonisjs/core";
import {CardFilters} from "#app/modules/cards/domain/contracts/card.filters";
import {CardEntity} from "#app/modules/cards/domain/card.entity";
import {CardReadRepository} from "#app/modules/cards/domain/contracts/card.read.repository";
import {IndexCardService} from "#app/modules/cards/application/contracts/index.card.service";

@inject()
export class IndexCard implements IndexCardService {
  constructor(
    private cardRepository: CardReadRepository
  ) {}

  async index(filters: CardFilters): Promise<CardEntity[]> {
    return this.cardRepository.findByFilters(filters)
  }
}
