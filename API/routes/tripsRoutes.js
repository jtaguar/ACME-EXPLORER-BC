'use strict';
module.exports=function(app){
    
    var application= require ('../controllers/tripsCtrl');
   
    /**
   
    * Post an trip
    *    RequiredRoles: None
    * get an trip 
    *    RequiredRoles: None
 
   * @section application
   * @type post get
   * @url /v1/applications
   * @param {string} sortedBy (category)
   */
    
  app.route('/v1/applications')
  .post(application.create_an_trip)
  .get(application.search_trip);

  /**
   * Put an applications
   * Delete an applications
  
   * @section applications
   * @type  put delete
   * @url /v1/application/:ticker
  */  
 app.route('/v1/trips/:ticker')
 .put(application.update_an_trip)
 .delete(application.delete_an_trip);
 


}

   