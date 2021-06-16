import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID

  let reviews
  //empty variable filling it, from the reviews collection

    export default class ReviewsDAO{
     static async injectDB(conn) {
         if(reviews) {
             return
         }
         try {
             //if it doesn't exist already it'll get created
             //access database and then the reviews collection
             reviews = await conn.db(process.env.RESTREVIEWS_NS).collection("reviews")
         } catch(e) {
             console.error('Unable to establish collection handles in userDAO: ${e}' )
         }
     }

     static async addReview(restaurantId, user, review, date) {
         try{
             //creating a review doc
            const reviewDoc = { name: user.name,
            user_id: user._id,
            date: date,
            text: review,
            restaurant_id: ObjectId(restaurantId), }
            //converting a restaurant id to an objectid
            return await reviews.insertOne(reviewDoc)
            } catch(e) {
             console.error('Unable to post review: ${e}')
             return { error: e }
             }
         }

       static async updateReview(reviewId, userId, text, date) {
        try{
            const updateResponse = await reviews.updateOne(
                { user_id:  userId, _id: ObjectId(reviewId)},
                { $set: {text: text, date: date } },
            )

            return updateResponse
        } catch(e) {
            console.error('Unable to post review: ${e}')
            return { error: e }
        }
      }

      static async deleteReview(reviewId , userId) {

        try {
            const deleteResponse = await reviews.deleteOne({
                _id: ObjectId(reviewId),
                user_id: userId,
            })
            return deleteResponse
        } catch(e) {
            console.error('Unable to delete review: ${e}' )
            return {error : e}
        }
      }


     }
 