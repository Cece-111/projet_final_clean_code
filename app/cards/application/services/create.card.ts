import {CardWriteRepository} from "../../domain/contracts/card.write.repository.js";
import {inject} from "@adonisjs/core";
import {CreateCardDto} from "../dto/create.card.dto";
import {CardEntity} from "#cards/domain/card.entity";
import {CreateCardService} from "../contracts/create.card.service.js";

@inject()
export class CreateCard implements CreateCardService {
  constructor(
    private repository: CardWriteRepository,
  ) {}

  create(dto: CreateCardDto): Promise<CardEntity> {
    const card = CardEntity.create(
      dto.question,
      dto.answer,
      dto.tag
    )

    return this.repository.create(card)
    }
}
