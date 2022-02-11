import connection from "../../database";
import { Request, Response } from "express"
import * as bcrypt from 'bcrypt'
import IUsers from '../interfaces/IUsers/'


const SessionController = {
  async sign(req :Request, res :Response) {

    const { email, password } = req.body

    try {
      const userExists : IUsers[]= await connection('users').where('email', '=', email)
      if(!userExists[0]) return res.status(400).send({ messsage: "User does not exists"})


      const validPassword = await bcrypt.compare(password, userExists[0].password)
      if(!validPassword) return res.status(400).send({ message: "Password invalid"}) 


      return res.status(200).send(userExists)
    } catch (error) {
      return res.status(404).send(error)
    }
  }
}


export default SessionController