import { CategoryNumbers} from "../../categories/enums/category_numbers.js";

export class CardEntity {
  private constructor(
    private readonly id: string | undefined,
    private question: string,
    private answer: string,
    private category: CategoryNumbers,
    private tag: string
  ) {}

  static create(
    question: string,
    answer: string,
    tag: string
  ): CardEntity {
    return new CardEntity(
      undefined,
      question,
      answer,
      CategoryNumbers.FIRST,
      tag
    )
  }

  static fromPersistence(
    id: string,
    question: string,
    answer: string,
    category: CategoryNumbers,
    tag: string
  ): CardEntity {
    return new CardEntity(
      id,
      question,
      answer,
      category,
      tag
    )
  }

  snapshot() {
    return {
      id: this.id,
      question: this.question,
      answer: this.answer,
      category: this.category,
      tag: this.tag,
    }
  }
}
