import express from "express"
import RestaurantsCtrl from "./restaurants.controller.js" //controller file will be what route's using
import ReviewsCtrl from "./reviews.controller.js"
const router = express.Router()

//whatever is returned comes from resctrl ka api_get_restra methods
router.route("/").get(RestaurantsCtrl.apiGetRestaurants)
router.route("/id/:id").get(RestaurantsCtrl.apiGetRestaurantsById)
//select cuisine from a drop down menu
router.route("/cuisines").get(RestaurantsCtrl.apiGetRestaurantCusines)

//creating routes for second half of our assignment
//adding and removing reviews
router
    .route("/review")
    .post(ReviewsCtrl.apiPostReview)
    .put(ReviewsCtrl.apiUpdateReview)
    .delete(ReviewsCtrl.apiDeleteReview)
//creating methods for when people go to these different routes
export default router