import { CardEntity } from "#app/modules/cards/domain/card.entity";

export class CardSerializer {
  public static toJson(card: CardEntity) {
    const data = card.snapshot();

    return {
      id: data.id,
      question: data.question,
      answer: data.answer,
      category: data.category,
      tag: data.tag,
    };
  }

  public static collection(cards: CardEntity[]) {
    return cards.map((card) => this.toJson(card));
  }
}
