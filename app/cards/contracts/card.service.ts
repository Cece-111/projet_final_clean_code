import {CardEntity} from "#cards/domain/card.entity";
import {CardFilters} from "#cards/contracts/card.filters";
import {createCardDto} from "#cards/dto/create.card.dto";

export abstract class CardService {
  abstract create(card: createCardDto): Promise<CardEntity>;
  abstract getCards(filters: CardFilters): Promise<CardEntity[]>;
  abstract validate(cardId: string, isValid: boolean): Promise<void>;
}
