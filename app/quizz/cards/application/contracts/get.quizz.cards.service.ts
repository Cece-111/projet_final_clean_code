import {CardEntity} from "#cards/domain/card.entity";

export abstract class GetQuizzCardsService {
  abstract getCardsForQuizz(date: Date): Promise<CardEntity[]>;
}
