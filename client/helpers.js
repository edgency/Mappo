Settings = {
    project: 'Mappo',	
    copyright: 'Mappo 2013',
    motto: 'Maps made easy!',
    mission: ''
};

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