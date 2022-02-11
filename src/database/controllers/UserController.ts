import connection from "../../database";
import { Request, Response } from "express"
import * as bcrypt from "bcrypt"
import IUsers from '../interfaces/IUsers/'

async function hashPassowrd(password :string) {
  try {
    const salt = await bcrypt.genSalt(10)
    const encryptedPassword = await bcrypt.hash(password, salt)

    return encryptedPassword
  } catch(error){
    return error
  }
}

const UserController = {
  async index(req : Request, res : Response) {

    try{
    const allUsers: IUsers[]= await connection('users').select('*')
    return res.status(200).send(allUsers)
    }
    catch(error) {
      return res.status(404).send(error)
    }
  },

  async create(req : Request, res : Response) {
    const { name, email, password } = req.body

   try{
     const userAlreadyExists : IUsers[]= await connection('users').where('email', '=', email)

     if (userAlreadyExists[0]) return res.status(404).send({ message: "User already exists"})

     const hashedPassword = await hashPassowrd(password)

     const user: IUsers = {name, email, password: hashedPassword}
     await connection('users').insert(user)

     return res.status(201).send(user) 
   }
    catch(error) {
       return res.status(404).send(error)
   }
 }
}

export default UserController