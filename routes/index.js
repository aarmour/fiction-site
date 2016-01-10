'use strict';

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Handle 404 errors
keystone.set('404', (request, response) => {
  response.notfound();
});

// Handle other errors
keystone.set('500', (error, request, response) => {
  let title;
  let message;

  if (error instanceof Error) {
    message = error.message;
    error = error.stack;
  }

  response.err(error, title, message);
});

// Import Route Controllers
var routes = {
  views: importRoutes('./views')
};

// Setup Route Bindings
exports = module.exports = function(app) {

  // Views
  app.get('/', routes.views.index);

  if (app.get('env') !== 'production') {
    app.get('/_errors/500', () => { throw new Error('Test error'); });
  }

};
