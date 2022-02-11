import connection from "../../database";
import { Request, Response } from "express"
import * as bcrypt from "bcrypt"
import IUsers from '../interfaces/IUsers/'

async function hashPassowrd(password :string) {
  //encrypting password provided by parameter
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
    //function to return all users in db

    try{
    const allUsers: IUsers[]= await connection('users').select('*')
    return res.status(200).send(allUsers)
    }
    catch(error) {
      return res.status(404).send(error)
    }
  },

  async create(req : Request, res : Response) {
    //method to create a new user
    const { username, email, password } = req.body

   try{
     //verify if user exists
     const userAlreadyExists : IUsers[]= await connection('users').where('email', '=', email)

     if (userAlreadyExists[0]) return res.status(400).send({ message: "User already exists"})
    //encrypting password
     const hashedPassword = await hashPassowrd(password)

     const user: IUsers = {username, email, password: hashedPassword}

    //sending data to db with knex
     await connection('users').insert(user)

     return res.status(201).send(user) 
   }
    catch(error) {
       return res.status(404).send(error)
   }
 }
}

export default UserController