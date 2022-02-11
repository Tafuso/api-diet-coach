import * as express from "express";
import routes from "./database/Routes"
import * as cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)



app.listen(3333, () => console.log('Server is running'))  
