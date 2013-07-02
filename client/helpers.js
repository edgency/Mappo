Settings = {
    project: 'Mappo',	
    copyright: 'Mappo 2013',
    motto: 'Maps made easy!',
    mission: ''
};

var Logger = function(){
	Meteor.subscribe('logs')
	var Logs = new Meteor.Collection( 'logs');
	function writeLog(type, msg){
		Logs.insert({
			time: (new Date).getTime(),
			text:msg,
			kind:type
		});
	};
	this.i = function(msg){
		return writeLog('info', msg);
	};
};

Log = new Logger;


/**
 * @return global settings
 */
Handlebars.registerHelper('g', function(key) {
    return Settings[key];
});

/**
 * @return translations
 */
Handlebars.registerHelper('t', function(key) {
    return undefined;
});

Handlebars.registerHelper('prettyDate', function(time){
	return moment(parseInt(time)).fromNow();
});

Template.page.helpers({
	


	
});