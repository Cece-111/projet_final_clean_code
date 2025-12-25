import router from '@adonisjs/core/services/router'
import {middleware} from "#start/kernel";

const ListCardsController = () => import('../../app/cards/controllers/get.cards.controller.js')
const QuizzController = () => import('../../app/cards/controllers/quizz.controller.js')
const AnswerCardController = () => import('../../app/cards/controllers/answer.card.controller.js')

router.group(() => {
  router.get('/', [ListCardsController, 'handle'])
  router.get('/quizz', [QuizzController, 'handle'])
  router.patch('/:id/answer', [AnswerCardController, 'handle']).where('id', router.matchers.uuid())

}).middleware(middleware.authentification())
  .prefix('/cards')
