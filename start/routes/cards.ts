import router from '@adonisjs/core/services/router'
import {middleware} from "#start/kernel";

const ListCardsController = () => import('../../app/cards/controllers/GetCardsController.js')

router.group(() => {
  router.get('/', [ListCardsController, 'getCardsByFilters'])

}).middleware(middleware.authentification())
  .prefix('/cards')
