import {CardEntity} from "#cards/domain/card.entity";
import {CreateCardDto} from "#cards/application/dto/create.card.dto";

export abstract class CreateCardService {
  abstract create(card: CreateCardDto): Promise<CardEntity>;
}
