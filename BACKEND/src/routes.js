const { Router } = require('express')
const DevController = require('./controllers/DevController')
const DevSearch = require('./controllers/SearchController')
const routes = Router()

routes.get('/devs', DevController.index)
routes.post('/devs', DevController.store)
routes.put('/devs', DevController.update)
routes.delete('/devs', DevController.delete)

routes.get('/search', DevSearch.index)

module.exports = routes