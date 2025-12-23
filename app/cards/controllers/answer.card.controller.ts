import {inject} from "@adonisjs/core";
import {HttpContext} from "@adonisjs/core/http";
import {CardService} from "#cards/contracts/card.service";
import {answerCardValidator} from "#validators/answer_card";

@inject()
export default class AnswerCardController {
  constructor(private readonly cardService: CardService) {}

  async handle({ request, params, response }: HttpContext): Promise<void> {
    const { isValid } = await request.validateUsing(answerCardValidator)
    const cardId: string = params.id
    await this.cardService.validate(cardId, isValid)
    return response.noContent()
  }
}
