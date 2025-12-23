import {CardEntity} from "#cards/domain/card.entity";
import {CardFilters} from "#cards/contracts/card.filters";

export abstract class CardRepository {
  abstract create(card: CardEntity): Promise<CardEntity>;
  abstract findByFilters(filters: CardFilters): Promise<CardEntity[]>;
  abstract findById(id: string): Promise<CardEntity>;
  abstract save(card: CardEntity): Promise<void>;
}
