'use strict';

const _ = require('lodash');

/**
 * Initializes variables for all views.
 */

exports.initLocals = (request, response, next) => {
  const locals = response.locals;

  locals.navLinks = [
    { label: 'Home', key: 'home', href: '/' }
  ];

  locals.user = request.user;

  next();
};


/**
 * Fetches and clears the flashMessages before a view is rendered.
 */

exports.flashMessages = (request, response, next) => {
  const flashMessages = {
    info: request.flash('info'),
    success: request.flash('success'),
    warning: request.flash('warning'),
    error: request.flash('error')
  };

  response.locals.messages = _.any(flashMessages, msgs => msgs.length) ? flashMessages : false;

  next();
};


/**
 * Prevents users from accessing protected pages when they're not signed in.
 */

exports.requireUser = (request, response, next) => {
  if (!request.user) {
    request.flash('error', 'Please sign in to access this page.');
    response.redirect('/keystone/signin');
  } else {
    next();
  }
};
