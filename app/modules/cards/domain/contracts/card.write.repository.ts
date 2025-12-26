import {CardEntity} from "#app/modules/cards/domain/card.entity";

export abstract class CardWriteRepository {
  abstract create(card: CardEntity): Promise<CardEntity>;
  abstract save(card: CardEntity): Promise<void>;
}
