import router from '@adonisjs/core/services/router'
import {middleware} from "#start/kernel";

const ListCardsController = () => import('#cards/infrastructure/controllers/get.cards.controller')
const QuizzController = () => import('#quizz/cards/infrastructure/controllers/quizz.controller')
const AnswerCardController = () => import('#cards/infrastructure/controllers/answer.card.controller')

router.group(() => {
  router.get('/', [ListCardsController, 'handle'])
  router.get('/quizz', [QuizzController, 'handle'])
  router.patch('/:id/answer', [AnswerCardController, 'handle']).where('id', router.matchers.uuid())

}).middleware(middleware.authentification())
  .prefix('/cards')
