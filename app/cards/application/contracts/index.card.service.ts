import {CardEntity} from "#cards/domain/card.entity";
import {CardFilters} from "#cards/domain/contracts/card.filters";

export abstract class IndexCardService {
  abstract index(filters: CardFilters): Promise<CardEntity[]>
}
