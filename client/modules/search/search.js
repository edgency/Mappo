/*
 *  this module searches waypoints and add autocomplete textbox to map
 */

Cat.define('search', function(context) {
	Meteor.subscribe( 'waypoints', {
			onError: function(e){
				throw 'No collection with name "waypoints" on server side.';
			}
	});
	var Waypoints = new Meteor.Collection('waypoints');
	
	Template.search.events({
		'click button': function(){
			console.log('add feature');
		}
	});
	
	Template.search.rendered = function(){
		$(this.find('input')).autocomplete({
			           source: function(request, response){
				          response.call(undefined,
					         Waypoints.find({"properties.name":new RegExp(request.term,"gi") })
				                   .map( function(item){
					                  return { value:item.properties.name, waypoint:item };
				                   })
						  );
			           },
			           // position: { my : "right top", at: "right bottom" },
			           select: function( event, ui ) {
				          context.trigger('create', ui.item.waypoint );
				          $(this).val('');
				          return false;
			           },
			           // hide helper texts
					   messages: {
					        noResults: '',
					        results: function() {}
					    },
					   open: function(){
						  $(this).autocomplete('widget').css('z-index', 500);
						  return false;
					   }
		           });		
	};
	

    
    var fragment = Meteor.render(
	  function () {
	    return Template.search( );
	});

	return {
		ready: function(map) {
            var options = {position: 'topright'};
			map.addPlugin( fragment, options);
		}

	};
});
