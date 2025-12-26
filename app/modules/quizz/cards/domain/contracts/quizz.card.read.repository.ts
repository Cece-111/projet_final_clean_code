import {CardEntity} from "#app/modules/cards/domain/card.entity";

export abstract class QuizzCardReadRepository {
  abstract findQuizzCards(date: Date): Promise<CardEntity[]>;
}
