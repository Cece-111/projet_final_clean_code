import {CardEntity} from "#app/modules/cards/domain/card.entity";
import {CardFilters} from "#app/modules/cards/domain/contracts/card.filters";

export abstract class IndexCardService {
  abstract index(filters: CardFilters): Promise<CardEntity[]>
}
