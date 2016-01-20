'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config'),
	uri = config.db.uri,
	JSON = require('./listings.json'),
	listingSchema = mongoose.model('Listing').schema;
	
/* Connect to your database */
mongoose.connect(uri, function(err){
	if(err)
		console.log('No');
	else
		console.log('yes');

});
/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
 */
var Entry = mongoose.model('listingDocument', listingSchema);

for(var ent in JSON.entries)
 {
    var val = JSON.entries[ent];

    var lat = "undefined";
    var long = "undefined";
    var addr = "undefined";

    if(!(val.coordinates === null || val.coordinates === undefined))
    {
      lat = val.coordinates.latitude;
      long = val.coordinates.longitude;
    }

    if(!(val.address === null || val.address === undefined))
    {
      addr = val.address;
    }

    var newListing= new Entry({
      code: val.code,
      name: val.name,
      coordinates:{
        latitude: lat,
        longitude: long
      },

      address: addr
    });

    newListing.save(function(err){
      if(err){
        console.log(err);
      }
      console.log('Listing saved');
    });

 }
	

/* 
  Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */
