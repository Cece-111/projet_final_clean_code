import router from '@adonisjs/core/services/router'
import {middleware} from "#start/kernel";

const ListCardsController = () => import('#app/modules/cards/infrastructure/controllers/get.cards.controller')
const QuizzController = () => import('#app/modules/quizz/cards/infrastructure/controllers/quizz.controller')
const AnswerCardController = () => import('#app/modules/cards/infrastructure/controllers/answer.card.controller')
const CreateCardServicen = () => import('#app/modules/cards/infrastructure/controllers/create.card.controller')

router.group(() => {
  router.get('/', [ListCardsController, 'handle'])
  router.get('/quizz', [QuizzController, 'handle'])
  router.post('/', [CreateCardServicen, 'handle'])
  router.patch('/:id/answer', [AnswerCardController, 'handle']).where('id', router.matchers.uuid())

}).middleware(middleware.authentification())
  .prefix('/cards')
