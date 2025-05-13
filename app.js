"use strict";

const path = require("node:path");
const AutoLoad = require("@fastify/autoload");
const fastifyView = require("@fastify/view");

// Pass --options via CLI arguments in command to enable these options.
const options = {};

module.exports = async function (fastify, opts) {
  // Place here your custom code!
  fastify.register(fastifyView, {
    engine: {
      ejs: require("ejs"),
    },
  });

  fastify.register(require("@fastify/formbody"));

  // Custom HTTP 400 error handler for validation
  fastify.setErrorHandler((error, request, reply) => {
    //Intercept HTTP 400 errors and display custom template
    if (error.validation && error.statusCode === 400) {
      return reply
        .status(400)
        .type("text/html")
        .view("views/validation_error.ejs", { errors: error.validation });
    }

    // Handle all other errors
    reply.send(error);
  });

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "plugins"),
    options: Object.assign({}, opts),
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options: Object.assign({}, opts),
  });
};

module.exports.options = options;
