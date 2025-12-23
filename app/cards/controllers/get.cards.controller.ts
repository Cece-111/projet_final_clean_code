import {inject} from "@adonisjs/core";
import {HttpContext} from "@adonisjs/core/http";
import {getCardsValidator} from "#validators/get_card";
import {CardService} from "#cards/contracts/card.service";

@inject()
export default class GetCardsController {
  constructor(private readonly cardService: CardService) {}

  /*
  * it gets a list of cards by filters or not.
  */
  async handle({ request }: HttpContext) {
    const rawData = await request.validateUsing(getCardsValidator)
    return this.cardService.getCards(rawData)
  }
}
