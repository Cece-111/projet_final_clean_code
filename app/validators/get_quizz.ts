import vine from '@vinejs/vine'

export const getQuizzCardsValidator = vine.compile(
  vine.object({
    date: vine.date({ formats: ['iso8601', 'YYYY-MM-DD'] }).optional(),
  })
)
