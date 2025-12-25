import {CardEntity} from "#cards/domain/card.entity";

export abstract class QuizzCardReadRepository {
  abstract findDueCards(date: Date): Promise<CardEntity[]>;
}
