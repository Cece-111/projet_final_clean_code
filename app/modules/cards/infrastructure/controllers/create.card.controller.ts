import {HttpContext} from "@adonisjs/core/http";
import {createCardValidator} from "#validators/create_card";
import {inject} from "@adonisjs/core";
import {CreateCardService} from "../../application/contracts/create.card.service.js";

@inject()
export default class CreateCardController {
  constructor(private readonly cardService: CreateCardService) {}

  async handle({ request, response }: HttpContext): Promise<void> {
    const createCardDto = await request.validateUsing(createCardValidator)
    await this.cardService.create(createCardDto)
    return response.created({description: 'Created card'})
  }
}
