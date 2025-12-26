import {CardEntity} from "#app/modules/cards/domain/card.entity";

export abstract class GetQuizzCardsService {
  abstract getCardsForQuizz(date: Date): Promise<CardEntity[]>;
}
