import {NEXT_CATEGORY_MAP} from "#app/modules/categories/mappers/category.mapper";
import {CategoryNumbers} from "#app/modules/categories/enums/category.numbers";
import {CATEGORY_FREQUENCY_MAP} from "#app/modules/categories/mappers/category.frequency.mapper";

export class CardEntity {
  private constructor(
    private readonly id: string | undefined,
    private question: string,
    private answer: string,
    private category: CategoryNumbers,
    private tag: string,
    private lastAnsweredDate: Date | null,
    private _nextReviewDate: Date
  ) {}

  static create(
    question: string,
    answer: string,
    tag: string
  ): CardEntity {
    const card = new CardEntity(
      undefined,
      question,
      answer,
      CategoryNumbers.FIRST,
      tag,
      null,
      new Date()
    )

    card._calculateNextReviewDate();

    return card
  }

  public moveNextCategory(): void {
    const next = NEXT_CATEGORY_MAP[this.category];
    if (next !== undefined && next !== null) {
      this.category = next;
      this._calculateNextReviewDate();
    }
  }

  public resetToFirstCategory(): void {
    this.category = CategoryNumbers.FIRST;
    this._calculateNextReviewDate();
  }

  public markAsAnswered(date: Date): void {
    this.lastAnsweredDate = date
  }

  private _calculateNextReviewDate(): void {
    const now = new Date();
    const daysToAdd = CATEGORY_FREQUENCY_MAP[this.category]

    const nextDate = new Date(now)
    nextDate.setDate(nextDate.getDate() + daysToAdd)
    this._nextReviewDate = nextDate;
  }

  static fromPersistence(
    id: string,
    question: string,
    answer: string,
    category: CategoryNumbers,
    tag: string,
    lastAnsweredDate: Date | null,
    nextReviewDate: Date
  ): CardEntity {
    return new CardEntity(
      id,
      question,
      answer,
      category,
      tag,
      lastAnsweredDate,
      nextReviewDate
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
      nextReviewDate: this._nextReviewDate
    }
  }
}
