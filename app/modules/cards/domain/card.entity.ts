import { NEXT_CATEGORY_MAP } from "#app/modules/categories/mappers/category.mapper";
import { CategoryNumbers } from "#app/modules/categories/enums/category.numbers";
import { CATEGORY_FREQUENCY_MAP } from "#app/modules/categories/mappers/category.frequency.mapper";

export class CardEntity {
  private constructor(
    private readonly id: string | undefined,
    private question: string,
    private answer: string,
    private category: CategoryNumbers,
    private tag: string,
    private nextReviewDate: Date | null
  ) {}

  static create(question: string, answer: string, tag: string): CardEntity {
    let date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(0, 0, 0, 0);

    return new CardEntity(
      undefined,
      question,
      answer,
      CategoryNumbers.FIRST,
      tag,
      date
    );
  }

  public moveNextCategory(): void {
    this.category = NEXT_CATEGORY_MAP[this.category];
    this.updateReviewDate();
  }

  public resetToFirstCategory(): void {
    this.category = CategoryNumbers.FIRST;
    this.updateReviewDate();
  }

  private updateReviewDate(): void {
    const daysToAdd = CATEGORY_FREQUENCY_MAP[this.category];

    if (daysToAdd === null) {
      this.nextReviewDate = null;
      return;
    }

    const newDate = new Date();
    newDate.setDate(newDate.getDate() + daysToAdd);

    newDate.setHours(0, 0, 0, 0);

    this.nextReviewDate = newDate;
  }

  static fromPersistence(
    id: string,
    question: string,
    answer: string,
    category: CategoryNumbers,
    tag: string,
    nextReviewDate: Date | null
  ): CardEntity {
    return new CardEntity(id, question, answer, category, tag, nextReviewDate);
  }

  snapshot() {
    return {
      id: this.id,
      question: this.question,
      answer: this.answer,
      category: this.category,
      tag: this.tag,
      nextReviewDate: this.nextReviewDate ? new Date(this.nextReviewDate) : null,
    };
  }
}
