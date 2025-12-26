import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Card from '#models/card'
import { CategoryNumbers } from "#app/modules/categories/enums/category.numbers"
import { DateTime } from 'luxon'

export default class CardSeeder extends BaseSeeder {
  async run() {
    await Card.query().delete()

    await Card.createMany([
      {
        question: 'Comment dit-on "Bonjour" en anglais ?',
        answer: 'Hello',
        category: CategoryNumbers.FIRST,
        tag: 'english',
        nextReviewDate: DateTime.now().startOf('day')
      },
      {
        question: 'Quelle est la capitale de la France ?',
        answer: 'Paris',
        category: CategoryNumbers.FIRST,
        tag: 'geography',
        nextReviewDate: DateTime.now().startOf('day')
      },
      {
        question: 'Quelle est la formule de l\'eau ?',
        answer: 'H2O',
        category: CategoryNumbers.SECOND,
        tag: 'science',
        nextReviewDate: DateTime.now().plus({ days: 2 }).startOf('day')
      },
      {
        question: 'Qui a écrit "Les Misérables" ?',
        answer: 'Victor Hugo',
        category: CategoryNumbers.THIRD,
        tag: 'literature',
        nextReviewDate: DateTime.now().plus({ days: 4 }).startOf('day')
      },
      {
        question: 'Traduire "Pomme" en espagnol',
        answer: 'Manzana',
        category: CategoryNumbers.FIRST,
        tag: 'spanish',
        nextReviewDate: DateTime.now().startOf('day')
      }
    ])
  }
}
