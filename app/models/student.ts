import { DateTime } from 'luxon'
import {BaseModel, beforeCreate, column} from '@adonisjs/lucid/orm'
import {randomUUID} from "node:crypto";

export default class Student extends BaseModel {
  public static table = 'users'

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare username : string

  @column({ serializeAs: null })
  declare password  : string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(student: Student) {
    student.id = randomUUID()
  }

}
