// app/validators/card_validator.ts
import {CardFilters} from "../contracts/cardFilters.js";
import {CategoryNumbers} from "../../categories/enums/categoryNumbers.js";

export class GetCardsValidator {
  public static validate(qs: any): CardFilters {
    const filters: CardFilters = {}

    if (qs.tags) {
      filters.tags = Array.isArray(qs.tags) ? qs.tags : [qs.tags]
    }

    if (qs.categories) {
      const categoriesRaw = Array.isArray(qs.categories) ? qs.categories : [qs.categories]

      filters.categories = categoriesRaw.filter((c: any) =>
        Object.values(CategoryNumbers).includes(c)
      ) as CategoryNumbers[]
    }

    return filters
  }
}
