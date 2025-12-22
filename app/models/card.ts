import { DateTime } from 'luxon'
import {BaseModel, beforeCreate, column} from '@adonisjs/lucid/orm'
import {randomUUID} from "node:crypto";
import {CategoryNumbers} from "../categories/enums/categoryNumbers.js";

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

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(card: Card) {
    card.id = randomUUID()
  }
}
