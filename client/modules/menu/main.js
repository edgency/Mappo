/*
 *  this module creates a menu
 */

Cat.define('menu', function(context) {

	Template.menu.events({
		'click .menu-item': function(event){
			var elem = $( event.srcElement );
		    $('.active').removeClass('active');
		    elem.parent().addClass('active');
		    context.trigger(elem.data('action'));
		},
		'click .logout': function(event){
			Meteor.logout();
		}
	});


	return {
		'create-menu': function( ) {
			context.trigger( 'menu-ready', Template.menu );
		}
	};
});