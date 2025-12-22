import vine from '@vinejs/vine'
import {CategoryNumbers} from "../categories/enums/categoryNumbers.js";

/**
 * Validates the post's creation action
 */
export const getCardsValidator = vine.compile(
  vine.object({
    tags: vine.array(vine.string()).optional(),
    categories: vine.array(vine.enum(CategoryNumbers)).optional(),
  })
)
