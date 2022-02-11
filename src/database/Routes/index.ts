import * as express from 'express'
const routes = express.Router()
import connection from '../../database'

import UserController from '../controllers/UserController'

interface IUsers {
  id: number,
  name: string,
  email: string,
  password: string
}

routes.get('/users', (req , res) => 
    connection('users').then((data : IUsers[]) => 
    res.json(data)))

routes.post('/users', UserController.create)    

export default routes