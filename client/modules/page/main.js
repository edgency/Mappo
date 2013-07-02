/*
 *  this module creates a page
 */

Cat.define('page', function(context) {


	return {
		'menu-ready': function( fragment ) {
			$('#menu').append( Meteor.render(fragment) );
		},
		'content-ready': function( fragment ) {
			$('#content').append( Meteor.render(fragment) );
		},
		render: function(){
			$('#footer').append( Meteor.render(Template.footer()));
			context.trigger('create-menu');
			context.trigger('create-content');
		}
	};
});