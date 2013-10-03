/* Meteor.absoluteUrl({
	rootUrl:'http://37.187.52.209:8000/'
}); */


Meteor.startup(function () {
	
	
	/* Points = new Meteor.Collection("tracked-points");
		Meteor.publish("tracked-points", function () {
		  return Points.find(); // everything
		});

		Meteor.methods({
		  track: function (trackerId, lng, lat) {
		    var point = {
		        "type": "Feature",
		        "properties":{
			        "trackerId": trackerId
		        },
		        "geometry": {
		            "type": "Point",
		            "coordinates": [lng, lat]
		        },
		    };
		    Points.insert(point);
		  }
		}); */
		
		Accounts.onCreateUser(function(options, user) {
		    if (options.profile) {
		        options.profile.url = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=square";
		        user.profile = options.profile;
		    }
		    return user;
		});
	
	
	Features = new Meteor.Collection("features");
	Meteor.publish("features", function () {
	  return Features.find(); // everything
	});
	
	Notes = new Meteor.Collection("notes");
	Meteor.publish("notes", function () {
	  return Notes.find(); // everything
	});
	
	Logs = new Meteor.Collection("logs");
	Meteor.publish("logs", function () {
	  return Messages.find(); // everything
	});
	
	Messages = new Meteor.Collection("messages");
	Meteor.publish("messages", function () {
	  return Messages.find(); // everything
	});
	
	// load waypoints from OSM
	Waypoints = new Meteor.Collection("waypoints");
	Meteor.publish("waypoints", function () {
  		return Waypoints.find(); 
	});
	
	if ( Waypoints.find().count() === 0 ){
		Meteor.http.get('https://api.mongohq.com/databases/osm/collections/node?_apikey=ad1r3nxynhxls3vfq5q9', function (err, res) {
			if (err){
				console.log('cannot download info about collection')
				return console.log( JSON.stringify(res) );
			}
			var MAX_LIMIT = 100;
			var count = res.data.count;
			console.log('downloading ' + count + ' waypoints');
			_.each(_.range(Math.ceil(count / MAX_LIMIT)), function(index) {
				Meteor.http.get('https://api.mongohq.com/databases/osm/collections/node/documents?_apikey=ad1r3nxynhxls3vfq5q9&limit=100&skip=' + (index * MAX_LIMIT),
				function (err, res) {
					if (err){
						console.log('cannot download data');
						return console.log( JSON.stringify(res) );
					}
					var list =  res.data;
				  	_.each( list, function( feature ){
						delete feature._id;
						delete feature.properties._id;
						Waypoints.insert( feature );
					});		
				});			
			});

		});		
	}


	
	
});