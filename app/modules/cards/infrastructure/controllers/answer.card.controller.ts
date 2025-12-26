import {inject} from "@adonisjs/core";
import {HttpContext} from "@adonisjs/core/http";
import {answerCardValidator} from "#validators/answer_card";
import {ValidateCardService} from "#app/modules/cards/application/contracts/validate.card.service";

@inject()
export default class AnswerCardController {
  constructor(private readonly cardService: ValidateCardService) {}

  async handle({ request, params, response }: HttpContext): Promise<void> {
    const { isValid } = await request.validateUsing(answerCardValidator)
    const cardId: string = params.id
    await this.cardService.validate(cardId, isValid)
    return response.noContent()
  }
}
