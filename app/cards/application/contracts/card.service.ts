import {CardEntity} from "#cards/domain/card.entity";
import {CardFilters} from "#cards/domain/contracts/card.filters";

export abstract class CardService {
  abstract getCards(filters: CardFilters): Promise<CardEntity[]>;
}
