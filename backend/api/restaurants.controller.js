import RestaurantsDAO from "../dao/restaurantsDAO.js"
//importing data access object

// we've created the restaurant controller class
export default class RestaurantsController{

    //first method
    //api method is called through url : there will be query string
    //specify certain parameters

    static async apiGetRestaurants(req, res, next) {

        //one query restPerPage = value of url , if exists , convert to int
    
        const restaurantsPerPage =req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage ,10) :20
    
         // same with page no
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

    //same with filters

        let filters = {}
        if(req.query.cuisine){
            filters.cuisine = req.query.cuisine
        } else if(req.query.zipcode) {
            filters.zipcode = req.query.zipcode
        } else if (req.query.name){
            filters.name = req.query.name
        }
  

    const{restaurantsList , totalNumRestaurants } = await RestaurantsDAO.getRestaurants({
        filters,
        page,
        restaurantsPerPage,
    })

    let response = {
        restaurants : restaurantsList,
        page: page,
        filters: filters,
        entries_per_page : restaurantsPerPage,
        total_results : totalNumRestaurants,
    }
    res.json(response)
}
}