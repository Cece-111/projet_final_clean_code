import {CreateCardDto} from "#cards/dto/create.card.dto";
import {CardEntity} from "#cards/domain/card.entity";

export abstract class CreateCardService {
  abstract create(card: CreateCardDto): Promise<CardEntity>;
}
