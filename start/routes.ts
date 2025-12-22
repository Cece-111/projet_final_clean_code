/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

import './routes/swagger.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})
