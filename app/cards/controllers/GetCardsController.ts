import {inject} from "@adonisjs/core";
import CardService from "../services/CardService.js";
import {HttpContext} from "@adonisjs/core/http";
import {GetCardsValidator} from "../validators/CardValidator.js";

@inject()
export default class GetCardsController {
  constructor(private readonly cardService: CardService) {}

  /*
  * it gets a list of cards by filters or not.
  */
  async getCardsByFilters({ request }: HttpContext) {
    const qs = request.qs()
    const payload = GetCardsValidator.validate(qs)
    return this.cardService.getCards(payload)
  }
}
