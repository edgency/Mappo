Cat.define('chat', function(context) {

	Meteor.subscribe('messages')
	var Messages = new Meteor.Collection( 'messages');
	
    Template.messages.messages = function(){
		return Messages.find({}, { sort:[ [ 'time', 'desc' ] ]});
	};
	
	Template.messages.noMessages = function(){
		return Messages.find().count() === 0;
	};
	
	Template.messageBox.events({
		'click .btn': function(event){
			Messages.insert({
				userId:Meteor.user()._id,
				displayName:Meteor.user().profile.name.split(' ')[0],
				text: $('#messageText').val(),
				time: (new Date).getTime()
			});
		}
	});

	return {
		'create-chat': function(  ) {
			context.trigger('chat-ready', Template.chatBox);
		},
		log: function(message){
			Messages.insert({
				text: $('#messageText').val(),
				time: (new Date).getTime()
			});
		}
	};
});