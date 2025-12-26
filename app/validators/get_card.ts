import vine from '@vinejs/vine'
import {CategoryNumbers} from "../modules/categories/enums/category.numbers.js";

export const getCardsValidator = vine.compile(
  vine.object({
    tags: vine
      .any()
      .optional()
      .transform((value, field) => {
        if (!value) return undefined
        const array = Array.isArray(value) ? value : [value]
        if (array.some((t) => typeof t !== 'string')) {
          field.report('Tags must be strings', 'string', field)
          return
        }
        return array
      }),

    categories: vine
      .any()
      .optional()
      .transform((value, field) => {
        if (!value) return undefined
        const array = Array.isArray(value) ? value : [value]
        const enumValues = Object.values(CategoryNumbers)

        const allValid = array.every((c) => enumValues.includes(c as any))

        if (!allValid) {
          field.report('One or more categories are invalid', 'enum', field)
          return
        }
        return array as CategoryNumbers[]
      })
  })
)
