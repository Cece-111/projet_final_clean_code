import {inject} from "@adonisjs/core";
import {HttpContext} from "@adonisjs/core/http";
import {GetQuizzCardsService} from "#app/modules/quizz/cards/application/contracts/get.quizz.cards.service";
import {getQuizzCardsValidator} from "#validators/get_quizz";
import {CardSerializer} from "#app/modules/cards/infrastructure/serializers/card.serializer";

@inject()
export default class QuizzController {
  constructor(private readonly getQuizzCardsService: GetQuizzCardsService) {}

  async handle({ request, response }: HttpContext): Promise<void> {
    const payload = await request.validateUsing(getQuizzCardsValidator)
    const queryDate = payload.date || new Date()
    const cards = await this.getQuizzCardsService.getCardsForQuizz(queryDate)
    return response.ok(CardSerializer.collection(cards))
  }
}
