import vine from '@vinejs/vine'

export const createCardValidator = vine.compile(
  vine.object({
    question: vine.string().trim().minLength(1),
    answer: vine.string().trim().minLength(1),
    tag: vine.string().trim().minLength(1),
  })
)
