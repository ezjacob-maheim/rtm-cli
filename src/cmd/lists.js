'use strict';

const log = require('../utils/log.js');
const finish = require('../utils/finish.js');
const config = require('../utils/config.js');
const styles = config.get().styles;


/**
 * This command lists all of the User's RTM Lists
 */
function action(args, env) {
  config.user(function(user) {
    log.spinner.start("Getting Lists...");

    // Get Lists
    user.lists.get(function(err, lists) {
      if ( err ) {
        log.spinner.error("Could not get lists (" + err.msg + ")");
        return finish();
      }
      log.spinner.stop();

      // Display List Information
      for ( let i = 0; i < lists.length; i++ ) {
        let list = lists[i];

        // List Name
        log.style(list.name, styles.list);

        // List Locked
        if ( list.locked ) {
          log.style(" locked", "dim");
        }

        // List Archived
        if ( list.archived ) {
          log.style(" archived", "dim");
        }

        // List Smart Filter
        if ( list.smart ) {
          log.style(" " + list.filter, "blue");
        }

        log();
      }

      return finish();
    });
  });
}


module.exports = {
  command: 'lists',
  alias: 'l',
  description: 'Display all lists',
  action: action
};