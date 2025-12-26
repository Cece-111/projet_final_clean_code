import {CardEntity} from "#app/modules/cards/domain/card.entity";

export abstract class QuizzCardReadRepository {
  abstract findDueCards(date: Date): Promise<CardEntity[]>;
}
