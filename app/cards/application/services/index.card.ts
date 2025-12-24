import {inject} from "@adonisjs/core";
import {CardFilters} from "#cards/domain/contracts/card.filters";
import {CardEntity} from "#cards/domain/card.entity";
import {CardReadRepository} from "#cards/domain/contracts/card.read.repository";
import {IndexCardService} from "#cards/application/contracts/index.card.service";

@inject()
export class IndexCard implements IndexCardService {
  constructor(
    private cardRepository: CardReadRepository
  ) {}

  async index(filters: CardFilters): Promise<CardEntity[]> {
    return this.cardRepository.findByFilters(filters)
  }
}
