const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurant_controller");
const wardController = require("../controllers/ward_controller");
const reviewController = require("../controllers/review_controller");
const userController = require("../controllers/user_controller");
const dietController =require("../controllers/diet_controller");
const placeController=require("../controllers/place_controller");
const routeController =require("../controllers/route_controller")
//restaurant controller
router.get("/restaurant", restaurantController.getRestaurants);
router.get("/restaurantid", restaurantController.getRestaurantsID);
router.post("/restaurantbound", restaurantController.getRestaurantsBound);

//ward controller
router.get('/ward',wardController.getWard);
router.get('/wardlatlon',wardController.getWardLatLon);

//review controller
router.get('/review', reviewController.getReview);
router.get('/reviewemail', reviewController.getReviewEmail);
router.post('/addreview', reviewController.addReview);
router.post('/editreview', reviewController.editReview);

//user controller
router.get('/getuser', userController.getUser);
router.post('/checkmail', userController.checkemail);
router.post('/checkphone', userController.checkphone);
router.post('/saveuser', userController.saveUser);
router.post('/edituser', userController.updateUser);
router.post('/checktoken', userController.decodeToken);
router.get('/logout', userController.logout);

//diet controller
 router.get('/diet', dietController.getDiet);


 //place controller
 router.get('/search', placeController.searchPlace);
router.get('/reverse', placeController.getAddressFromLatLon);

//route controller
router.get('/route',routeController.getRoute)
module.exports = router;

