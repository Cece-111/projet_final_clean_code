import { BaseSchema } from '@adonisjs/lucid/schema'
import {CategoryNumbers} from "../../app/categories/enums/CategoryNumbers.js";

export default class extends BaseSchema {
  protected tableName = 'cards'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id')
      table.string('question')
      table.string('answer')
      table.enum('category', Object.values(CategoryNumbers))
      table.string('tag')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
