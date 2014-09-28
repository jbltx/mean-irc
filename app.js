'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Irc = new Module('irc');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Irc.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Irc.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Irc.menus.add({
    title: 'IRC',
    link: 'irc help page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Irc.aggregateAsset('css', 'irc.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Irc.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Irc.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Irc.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Irc;
});
