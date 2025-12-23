import vine from '@vinejs/vine'

export const answerCardValidator = vine.compile(
  vine.object({
    isValid: vine.boolean(),
  })
)
