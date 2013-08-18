Cat.define('insert', function(context) {
	
	Template.insert.events({
		'keypress': function(event){
			if (event.which === 13) { /* enter key */
			      var text = event.currentTarget.value;
			      // console.log(text);
			      // TODO validation
			      context.trigger('add', {
					text:text, author:Meteor.userId(), createdAt: (new Date).getTime()
				  });
			}
		}
	});
	
	return {
	    /* empty */
	};
});