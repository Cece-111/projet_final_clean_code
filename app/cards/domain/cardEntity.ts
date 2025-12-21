import {Category_numbers} from "../../categories/enums/category_numbers.js";

export class CardEntity {
  private readonly id: string
  private readonly question: string
  private readonly answer: string
  private readonly category: Category_numbers
  private readonly tag: string

  constructor(id: string, question: string, answer: string, category: Category_numbers, tag: string) {
    this.id = id
    this.question = question
    this.answer = answer
    this.category = category
    this.tag = tag
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
