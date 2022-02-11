import * as express from 'express'
const routes = express.Router()
import connection from '../../database'

import UserController from '../controllers/UserController'
import SessionController from '../controllers/SessionController'


routes.get('/users', UserController.index)
routes.post('/users', UserController.create)    

routes.post('/session', SessionController.sign)

export default routes