/* Fill out these functions using Mongoose queries*/

var mongoose = require('mongoose'), 
    Listing = require('./ListingSchema.js'), 
    config = require('./config'),
	uri = config.db.uri,
	listingSchema = mongoose.model('Listing').schema;
	

mongoose.connect(uri, function(err){
	if(err)
		console.log('Error: Cannot connect to database');

});

var Entry = mongoose.model('listingDocument', listingSchema);

var findLibraryWest = function() {
  /* 
    Find the document that contains data corresponding to Library West,
    then log it to the console. 
   */
	Entry.findOne({ 'name': 'Library West' }, function (err, ent) {
  		if (err) 
			console.log('Error');
		else
  			console.log(ent);
		console.log('\n');
	});
};

var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed 
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console. 
   */
	Entry.findOne({ 'code': 'CABL' }, function (err, ent) {
  		if (err) 
			console.log('Error');
		else {
  			console.log(ent);
			console.log('\n');
			Entry.remove({'code': 'CABL'}, function (err, ent) {
				if (err) 
					console.log('Error');
			});
		}
	});
};

var updatePhelpsMemorial = function() {
  /*
    Phelps Memorial Hospital Center's address is incorrect. Find the listing, update it, and then 
    log the updated document to the console. 
   */
	Entry.findOne({ 'name': 'Phelps Laboratory' }, function (err, ent) {
  		if (err) 
			console.log('Error');
		else
			ent.address = "102 Phelps Lab, Gainesville, FL 32611, United States";
  			console.log(ent);
		console.log('\n');
	});
	
};

var retrieveAllListings = function() {
  /* 
    Retrieve all listings in the database, and log them to the console. 
   */
	Entry.find({}, function (err, doc) {
		console.log(doc);
	});
};

findLibraryWest();
removeCable();
updatePhelpsMemorial();
retrieveAllListings();
