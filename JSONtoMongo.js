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
		console.log('Error: Cannot connect to database');
});
/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
 */
var Entry = mongoose.model('listingDocument', listingSchema);

for(var ent in JSON.entries)
 {
    var val = JSON.entries[ent];

	val.coordinates = val.coordinates || {
		latitude: 0,
		longitude: 0
	};

	val.address = val.address || "None Listed";

    var newListing= new Entry({
      code: val.code,
      name: val.name,
      coordinates:{
        latitude: val.coordinates.latitude,
        longitude: val.coordinates.longitude
      },

      address: val.address
    });

    newListing.save(function(err){
      if(err)
        console.log('Error saving listings');
    });

 }
	

/* 
  Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */
