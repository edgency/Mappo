Meteor.startup(function () {
	Points = new Meteor.Collection("tracked-points");
	Meteor.publish("tracked-points", function () {
	  return Points.find(); // everything
	});
	
	Meteor.methods({
	  track: function (lng, lat) {
	    var point = {
	        "type": "Feature",
	        "geometry": {
	            "type": "Point",
	            "coordinates": [lng, lat]
	        },
	    };
	    Points.insert(point);
	  }
	});

	
});