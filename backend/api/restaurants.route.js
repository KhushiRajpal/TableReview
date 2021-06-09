import express from "express"
import RestaurantsCtrl from "./restaurants.controller.js" //controller file will be what route's using
import ReviewsCtrl from "./reviews.controller.js"
const router = express.Router()

//whatever is returned comes from resctrl ka apigetrestra methods
router.route("/").get(RestaurantsCtrl.apiGetRestaurants)

router
    .route("/review")
    .post(ReviewsCtrl.apiPostReview)
    .put(ReviewsCtrl.apiUpdateReview)
    .delete(ReviewsCtrl.apiDeleteReview)

export default router