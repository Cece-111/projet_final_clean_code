export abstract class ValidateCardService {
  abstract validate(cardId: string, isValid: boolean): Promise<void>;
}
