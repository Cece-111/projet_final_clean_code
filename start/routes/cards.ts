import router from '@adonisjs/core/services/router'
const ListCardsController = () => import('../../app/cards/controllers/GetCardsController.js')

router.group(() => {

  router.get('/', [ListCardsController, 'getCardsByFilters'])

}).prefix('/cards')
