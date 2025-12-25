import { CardEntity } from "#cards/domain/card.entity";
import { CategoryNumbers } from "#app/categories/enums/category.numbers";

export class QuizzEntity {
  private readonly startedAt: Date;
  private readonly cards: CardEntity[];

  private constructor(cards: CardEntity[], startedAt: Date) {
    this.cards = cards.filter(card => {
      const data = card.snapshot();
      return data.category !== CategoryNumbers.DONE;
    });
    this.startedAt = startedAt;
  }

  static create(cards: CardEntity[], date: Date): QuizzEntity {
    return new QuizzEntity(cards, date);
  }

  snapshot() {
    return {
      startedAt: this.startedAt,
      cards: this.cards.map(card => card.snapshot()),
      count: this.cards.length
    };
  }

  getCards(): CardEntity[] {
    return this.cards;
  }

  getStartedAt(): Date {
    return this.startedAt;
  }
}
