Cat.define('list', function(context) {
	Meteor.subscribe( 'notes', {
			onError: function(e){
				throw 'No collection with name "notes" on server side.';
			}
	});
	var Notes = new Meteor.Collection('notes');	
	
	var query = Notes.find({})
	                 .observe({
						added: function(note){
							if ( $('#content').scrollTop() > 0 ){
								// count unread notes
								$('#content').scrollTop( $('#content').scrollTop() + 56);
							}
						}
					 });
	
	// TODO create a reusable data structure
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
	
	var Scroller = {
		onScroll: function(){
			this.dep.changed();
		},
		getPosition: function(){
			this.dep.depend();
			return $('#content').scrollTop();
		}
	};
	Scroller.dep = new Deps.Dependency;
	
	Template.notes.preserve({
	  '#content': function (node) { return node.id; }
	});
	
	Template.notes.rendered = function(  ){
		var step = 15;
		
		$("#scrollUp").bind("click", function(event) {
		    event.preventDefault();
		    $("#content").animate({
		        scrollTop: "-=" + step + "px"
		    });
		    Scroller.onScroll();
		});


		$("#scrollDown").bind("click", function(event) {
		    event.preventDefault();
		    $("#content").animate({
		        scrollTop: "+=" + step + "px"
		    });
			Scroller.onScroll();
		});
	
	
	};
	
	
	Template.notes.helpers({
		notes: function(){
			var featureId = SelectedFeature.getId();
			return Notes.find({ featureId:featureId }, {sort: {createdAt: -1}});
		},
		hasNotes: function(){
			var featureId = SelectedFeature.getId();
			return Notes.find({ featureId:featureId }).count() > 0;
		},
		countNotes: function(){
			var featureId = SelectedFeature.getId();
			return Notes.find({ featureId:featureId }).count();
		},
		timeAgo: function(millisec){
			return moment( millisec ).fromNow();
		},
		hasMoreRecent: function(){
			return Scroller.getPosition() > 0 ? '': 'disabled';
		},
		hasOlder:function(){
			return true;
		//	return $("#content").scrollTop() - ?? > 0;
		}
	});
	
	return {
	
	     add: function( note ){
		    // TODO verify if a feature is selected
		    note.featureId = SelectedFeature.getId();
		    Notes.insert(note);
	     },
	
	     change: function( feature ){
		    var featureId = feature._id;
			SelectedFeature.setId(featureId);
	     }
	};
});