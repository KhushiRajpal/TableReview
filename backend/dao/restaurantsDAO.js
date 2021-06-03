let restaurants
//use to store reference to database
//dao = data access object

export default class RestaurantsDAO{
    //inject db is how we initally access our database
    //database starts, and we call this method
    static async injectDB(conn) {
        if(restaurants){
            return
        }
        try{
            //conn.db : connecting to databse using out environmental variable
            restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants")
        } catch (e) {
            console.error(
                'Unable to establish a collection handle in restaurantsDAO: ${e}' , 
            )
        }
    }

    //function to call when we access all the lists in the database
    //someone will call the get restaurants method with some filters
    static async getRestaurants({
        filters = null,
        page = 0,
        restaurantsPerPage = 20,
    } = {}) {
        let query
        if(filters){
        if("name" in filters){
            query = { $text: { $search: filters["name"] } }
        } else if("cuisine" in filters){
            query = { "cuisine" : { $eq: filters["cuisine"] } } 
        } else if("zipcode" in filters){
            query = { "address.zipcode" : {$eq: filters["zipcode"]}}
        }
    }
    

    let cursor

    try{
        cursor = await restaurants
          .find(query)
    } catch(e) {
        console.error('Unable to issue find command, $(e)')
        return { restaurantsList: [], totalNumRestaurants : 0 }

    }

    const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page)

        try{
            const restaurantsList = await displayCursor.toArray()
            const totalNumRestaurants =  await restaurants.countDocuments(query)

            return { restaurantsList, totalNumRestaurants}
       } catch(e) {
            console.error(
            'Unable to convert cursor to array or problem counting documents , ${e}',
            )
            return { restaurantsList: [] , totalNumRestaurants: 0  }

        }

    }
}4