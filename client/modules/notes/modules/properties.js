Cat.define('feature', function(context, options) {
	
	var Features = Collections.get("features");
	
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
	
	Template.properties.helpers({
		feature: function(){
			var featureId = SelectedFeature.getId();
			var feature = Features.findOne({_id:featureId});
			
			if ( feature ){
				if ( feature.properties  ){
					feature.icon = options.icons( feature.properties );
				}
				context.trigger('change', feature);
			}		
			return feature;
		}
	});
	
	
	return {
	
		show: function(featureId){
			SelectedFeature.setId(featureId );
		},
		// TODO ugly, find another way
		onElevation: function( data ){
			context.trigger('onElevation', data);
		},
		ready: function(map){
			context.trigger('ready', map);
		}
	
	};
});