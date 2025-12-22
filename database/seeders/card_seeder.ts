import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Card from '#models/card'
import {CategoryNumbers} from "../../app/categories/enums/CategoryNumbers.js";


export default class extends BaseSeeder {
  async run() {
    await Card.createMany([
      {
        question: 'Comment dit-on "Bonjour" en anglais ?',
        answer: 'Hello',
        category: CategoryNumbers.FIRST,
        tag: 'english',
      },
      {
        question: 'Quelle est la capitale de la France ?',
        answer: 'Paris',
        category: CategoryNumbers.FIRST,
        tag: 'geography',
      },
      {
        question: 'Quelle est la formule de l\'eau ?',
        answer: 'H2O',
        category: CategoryNumbers.SECOND,
        tag: 'science',
      },
      {
        question: 'Qui a écrit "Les Misérables" ?',
        answer: 'Victor Hugo',
        category: CategoryNumbers.THIRD,
        tag: 'literature',
      },
      {
        question: 'Traduire "Pomme" en espagnol',
        answer: 'Manzana',
        category: CategoryNumbers.FIRST,
        tag: 'spanish',
      }
    ])
  }
}
