import {inject} from "@adonisjs/core";
import {HttpContext} from "@adonisjs/core/http";
import {CardService} from "#cards/contracts/card.service";

@inject()
export default class QuizzController {
  constructor(private readonly cardService: CardService) {}

  async handle({ request, response }: HttpContext): Promise<void> {
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

    const cards = await this.cardService.getCardsForQuizz(quizzDate)
    const data = cards.map(c => c.snapshot())
    return response.ok(data)
  }
}
