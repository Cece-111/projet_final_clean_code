import { DateTime } from 'luxon'
import {BaseModel, beforeCreate, column} from '@adonisjs/lucid/orm'
import {randomUUID} from "node:crypto";
import {CategoryNumbers} from "../modules/categories/enums/category.numbers.js";

export default class Card extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare question: string

  @column()
  declare answer: string

  @column()
  declare category: CategoryNumbers

  @column()
  declare tag: string

  @column.dateTime()
  declare lastAnsweredDate: DateTime | null

  @column.dateTime()
  declare nextReviewDate: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(card: Card) {
    card.id = randomUUID()
  }
}
