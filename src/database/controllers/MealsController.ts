import connection from "../../database";
import { request, Request, Response } from "express"
import IMeals from "../interfaces/IMeals"

const MealsController = {
  async store(req : Request, res: Response) {

    const { user_id } = req.params

    const {
      type_meals,
      date,
      protein, 
      protein_qtd, 
      carbohydrate, 
      carbohydrate_qtd, 
      vegetable, 
      vegetable_qtd,
    } :IMeals =  req.body

    console.log(req.body)
    const meal :IMeals= {
      user_id:  parseInt(user_id),
      type_meals,
      date, 
      protein, 
      protein_qtd, 
      carbohydrate, 
      carbohydrate_qtd, 
      vegetable, 
      vegetable_qtd,
    }
    try {
      await connection('meals').insert(meal)
      
      return res.status(201).send(meal)

    } catch (error) {
      console.log(error)
      return res.status(404).send(error)    
    }
  },

  async index(req: Request, res: Response) {
    try{
      const { user_id, x } = req.params
      
      const mealsByUser: IMeals[]= await  connection('meals').orderBy('date', "desc").where('user_id', '=', parseInt(user_id)).limit(5).offset(5 * parseInt(x))
      return res.status(200).send(mealsByUser)
      }
      catch(error) {
        return res.status(404).send(error)
      }
  },

  async delete(req: Request, res: Response) {
    const { meal_id } = req.params

    try {
      await connection('meals').where('id', '=', parseInt(meal_id)).del()

      return res.status(200).send({ status: "deleted"})
      
    } catch (error) {
      return res.status(404).send(error)
    }
  },

  async update(req: Request, res: Response) {
    const { meal_id } = req.params

    try {
      const {
        type_meals,
        date,
        protein, 
        protein_qtd, 
        carbohydrate, 
        carbohydrate_qtd, 
        vegetable, 
        vegetable_qtd,
      } :IMeals = req.body
  
      const meal :IMeals= {
        type_meals,
        date, 
        protein, 
        protein_qtd, 
        carbohydrate, 
        carbohydrate_qtd, 
        vegetable, 
        vegetable_qtd,
      }
      
      await connection('meals').where('id', '=', parseInt(meal_id)).update(meal)

      return res.status(201).send(meal)

    } catch (error) {
      return res.status(404).send(error)
    }
  },

  async searchById(req :Request, res :Response) {
    const { meal_id } = req.params

    const searched = await connection('meals').where('id', '=', parseInt(meal_id))

    return res.status(200).send(searched)
  }
}

export default MealsController