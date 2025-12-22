import {inject} from "@adonisjs/core";
import CardService from "../services/CardService.js";
import {HttpContext} from "@adonisjs/core/http";
import {getCardsValidator} from "#validators/get_card";

@inject()
export default class GetCardsController {
  constructor(private readonly cardService: CardService) {}

  /*
  * it gets a list of cards by filters or not.
  */
  async getCardsByFilters({ request }: HttpContext) {
    const rawData = await request.validateUsing(getCardsValidator)
    return this.cardService.getCards(rawData)
  }
}
