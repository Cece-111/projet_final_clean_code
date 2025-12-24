import {inject} from "@adonisjs/core";
import {ValidateCardService} from "#cards/application/contracts/validate.card.service";
import {CardWriteRepository} from "#cards/domain/contracts/card.write.repository";
import { CardReadRepository } from "#app/cards/domain/contracts/card.read.repository";

@inject()
export class ValidateCard implements ValidateCardService {
  constructor(
    private cardRepository: CardWriteRepository,
    private cardReadRepository: CardReadRepository
  ) {}

  async validate(cardId: string, isValid: boolean): Promise<void> {
    const card = await this.cardReadRepository.findById(cardId);
    if (isValid) {
      card.moveNextCategory();
    } else {
      card.resetToFirstCategory();
    }

    await this.cardRepository.save(card);
  }
}
