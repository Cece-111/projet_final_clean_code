import {CardEntity} from "#app/modules/cards/domain/card.entity";
import {CreateCardDto} from "#app/modules/cards/application/dto/create.card.dto";

export abstract class CreateCardService {
  abstract create(card: CreateCardDto): Promise<CardEntity>;
}
