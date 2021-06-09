import app from "./server.js"
import mongodb from "mongodb" //access mongodb
import dotenv from "dotenv" //access environment variables
dotenv.config() // config our environment variables
import RestaurantsDAO from "./dao/restaurantsDAO.js"
import ReviewsDAO from "./dao/reviewsDAO.js"

//in this file we connect to the database and start the server
//imports:
//import the file we already created



const MongoClient = mongodb.MongoClient



const port = process.env.PORT || 8000

//connecting to database 
//uri
MongoClient.connect(
  //options to access the database
  process.env.RESTREVIEWS_DB_URI,
  {
      poolSize: 50,
      useNewUrlParser : true,
      writeConcern:{
        wtimeout: 2500
      }
     }
   )
   //catching our errors
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })

    .then(async client => {
      await RestaurantsDAO.injectDB(client)
        app.listen(port, () => {
            console.log('listening on port ${port}')
        })
    })
   

    
    // now for creating route
    
    

