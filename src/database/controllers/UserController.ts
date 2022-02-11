import connection from "../../database";
import { Request, Response } from "express"

interface IUsers {
  name: string,
  email: string,
  password: string
}

const UserController = {
  async create(req : Request, res : Response) {
    const { name, email, password } = req.body

   try{
     const userAlreadyExists = await connection('users').where('email', '=', email)

     if (userAlreadyExists.length > 0) return res.status(404).send({ message: "User already exists"})

     const user: IUsers = {name, email, password}

     await connection('users').insert(user)

     return res.status(201).send(user) 
   }
    catch(error) {
       return res.status(404).send(error)
   }
 }
}

export default UserController