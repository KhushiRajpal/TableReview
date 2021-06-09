import express from "express"
import cors from "cors"
import restaurants from "./api/restaurants.route.js"

//this is the file we're using to create routes
// we make an app using express and export as module

const app = express()

app.use(cors())
app.use(express.json());
//allows json in the body of the request

//every route starts with this and then (go to restaurant routes)
app.use("/api/v1/restaurants" , restaurants)
app.use("*",  (req, res) => res.status(404).json({error:"not found"}))

// exporting file as a module
export default app

//we're seperating our main sever code from database

//next we create .env and save the environment variables 
//uri is a generic variable