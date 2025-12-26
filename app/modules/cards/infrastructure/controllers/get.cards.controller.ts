import {inject} from "@adonisjs/core";
import {HttpContext} from "@adonisjs/core/http";
import {getCardsValidator} from "#validators/get_card";
import {IndexCardService} from "#app/modules/cards/application/contracts/index.card.service";
import {CardSerializer} from "#app/modules/cards/infrastructure/serializers/card.serializer";

@inject()
export default class GetCardsController {
  constructor(private readonly cardService: IndexCardService) {}

  /*
  * it gets a list of cards by filters or not.
  */
  async handle({ request }: HttpContext) {
    const rawData = await request.validateUsing(getCardsValidator)
    let cards = await this.cardService.index(rawData)
    return CardSerializer.collection(cards);
  }
}
