import connection from "../../database";
import { Request, Response } from "express"
import * as bcrypt from 'bcrypt'
import IUsers from '../interfaces/IUsers/'


const SessionController = {
  //controller to log in the system
  async sign(req :Request, res :Response) {

    //get data from body
    const { email, password } = req.body

    try {
    //try to validate session, verify email and password
      const userExists : IUsers[]= await connection('users').where('email', '=', email)
      if(!userExists[0]) return res.status(401).send({ messsage: "Authentication error"})

    //comparison between provided password and db password, usign bcrypt to compare cryptography
      const validPassword = await bcrypt.compare(password, userExists[0].password)
      if(!validPassword) return res.status(401).send({ message: "Authentication error"}) 


      return res.status(200).send(userExists[0])
    } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
      return res.status(404).send(error)
    }
  }
}


export default SessionController