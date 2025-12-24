import router from '@adonisjs/core/services/router'
import {middleware} from "#start/kernel";

const ListCardsController = () => import('../../app/cards/infrastructure/controllers/get.cards.controller.js')
const AnswerCardController = () => import('../../app/cards/infrastructure/controllers/answer.card.controller.js')
const CreateCardController = () => import('../../app/cards/infrastructure/controllers/create.card.controller.js')

router.group(() => {
  router.get('/', [ListCardsController, 'handle'])
  router.post('/', [CreateCardController, 'handle'])
  router.patch('/:id/answer', [AnswerCardController, 'handle']).where('id', router.matchers.uuid())

}).middleware(middleware.authentification())
  .prefix('/cards')
