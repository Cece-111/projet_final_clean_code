import {CardFilters} from "#cards/domain/contracts/card.filters";
import {CardEntity} from "#cards/domain/card.entity";

export abstract class CardReadRepository {
  abstract findById(id: string): Promise<CardEntity>;
  abstract findByFilters(filters: CardFilters): Promise<CardEntity[]>;
}
