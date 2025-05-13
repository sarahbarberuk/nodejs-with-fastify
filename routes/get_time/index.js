"use strict";

// Export Node.js module
module.exports = async function (fastify, opts) {
  // Create the default Fastify route for this path
  fastify.get("/", async (request, reply) => {
    const current_time = new Date().toLocaleString(); // Calculate the current time
    const display_message = "Get back to work!"; // Create a custom message to display in the template
    return reply.view("/views/display_time.ejs", {
      time: current_time,
      message: display_message,
    }); // Return a response, supplying data to the template variables
  });
};
