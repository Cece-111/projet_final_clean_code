import {inject} from "@adonisjs/core";
import {HttpContext} from "@adonisjs/core/http";
import {GetQuizzCardsService} from "#quizz/cards/application/contracts/get.quizz.cards.service";

@inject()
export default class QuizzController {
  constructor(private readonly getQuizzCardsService: GetQuizzCardsService) {}

  async handle({ request, response }: HttpContext): Promise<void> {
    // A mettre dans un validator
    const { date } = request.qs()
    let quizzDate: Date

    if (date) {
      quizzDate = new Date(date)
      if (isNaN(quizzDate.getTime())) {
          return response.badRequest('Invalid date format')
      }
    } else {
      quizzDate = new Date()
    }

    const quizz = await this.getQuizzCardsService.getCardsForQuizz(quizzDate)
    //const cards = CardSerializer.collection(quizz.getCards())
    return response.ok(quizz)
  }
}
