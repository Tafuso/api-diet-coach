import * as express from 'express'
const routes = express.Router()
import connection from '../../database'

interface Users {
  id: number,
  name: string,
  email: string,
  password: string
}

routes.get('/users', (req , res) => 
    connection('users').then((data : Users[]) => 
    res.json(data)))

export default routes