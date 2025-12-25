import {NEXT_CATEGORY_MAP, PREVIOUS_CATEGORY_MAP} from "../../categories/mappers/category.mapper.js";
import {CategoryNumbers} from "../../categories/enums/category.numbers.js";

export class CardEntity {
  private constructor(
    private readonly id: string | undefined,
    private question: string,
    private answer: string,
    private category: CategoryNumbers,
    private tag: string,
    private lastAnsweredDate: Date | null
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
      tag,
      null
    )
  }

  public moveNextCategory(): void {
    const next = NEXT_CATEGORY_MAP[this.category];
    if (next !== undefined && next !== null) {
      this.category = next;
    }
  }

  public movePreviousCategory(): void {
    const previous = PREVIOUS_CATEGORY_MAP[this.category];
    if (previous !== undefined && previous !== null) {
      this.category = previous;
    }
  }

  public markAsAnswered(date: Date): void {
    this.lastAnsweredDate = date
  }

  static fromPersistence(
    id: string,
    question: string,
    answer: string,
    category: CategoryNumbers,
    tag: string,
    lastAnsweredDate: Date | null
  ): CardEntity {
    return new CardEntity(
      id,
      question,
      answer,
      category,
      tag,
      lastAnsweredDate
    )
  }

  snapshot() {
    return {
      id: this.id,
      question: this.question,
      answer: this.answer,
      category: this.category,
      tag: this.tag,
      lastAnsweredDate: this.lastAnsweredDate,
    }
  }
}