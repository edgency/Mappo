Cat.define('list', function(context) {
	Meteor.subscribe( 'notes', {
			onError: function(e){
				throw 'No collection with name "notes" on server side.';
			}
	});
	var Notes = new Meteor.Collection('notes');	
	
	var SelectedFeature = {
		keys: {},
		deps: {},
		getId: function(){
			this.ensureDeps('id');
			this.deps['id'].depend();
			return this.keys['id'];
		},
		setId: function(id){
			this.ensureDeps('id');
			this.keys['id'] = id;
			this.deps['id'].changed();
		},
		ensureDeps: function (key) {
		  if (!this.deps[key])
		    this.deps[key] = new Deps.Dependency;
		}
	};
	
	Template.notes.rendered = function(){
		var step = 15;
		var scrolling = false;

		// Wire up events for the 'scrollUp' link:
		$("#scrollUp").bind("click", function(event) {
		    event.preventDefault();
		    // Animates the scrollTop property by the specified
		    // step.
		    $("#content").animate({
		        scrollTop: "-=" + step + "px"
		    });
		}).bind("mouseover", function(event) {
		    scrolling = true;
		    scrollContent("up");
		}).bind("mouseout", function(event) {
		    scrolling = false;
		});


		$("#scrollDown").bind("click", function(event) {
		    event.preventDefault();
		    $("#content").animate({
		        scrollTop: "+=" + step + "px"
		    });
		}).bind("mouseover", function(event) {
		    scrolling = true;
		    scrollContent("down");
		}).bind("mouseout", function(event) {
		    scrolling = false;
		});

		function scrollContent(direction) {
		    var amount = (direction === "up" ? "-=1px" : "+=1px");
		    $("#content").animate({
		        scrollTop: amount
		    }, 1, function() {
		        if (scrolling) {
		            scrollContent(direction);
		        }
		    });
		}		
	};
	
	Template.notes.helpers({
		notes: function(){
			var featureId = SelectedFeature.getId();
			return Notes.find({ featureId:featureId }, {sort: {createdAt: -1}});
		}
	});
	
	return {
	
	     add: function( note ){
		    // TODO verify if a feature is selected
		    note.featureId = SelectedFeature.getId();
		    Notes.insert(note);
	     },
	
	     change: function( featureId ){
			SelectedFeature.setId(featureId);
	     }
	};
});