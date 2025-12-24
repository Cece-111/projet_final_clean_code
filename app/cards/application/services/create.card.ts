import {CardWriteRepository} from "../../domain/contracts/card.write.repository.js";
import {inject} from "@adonisjs/core";
import {CardEntity} from "#cards/domain/card.entity";
import {CreateCardService} from "../contracts/create.card.service.js";
import {CreateCardDto} from "#cards/application/dto/create.card.dto";

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
