# Node.js app with Fastify

This is a companion repository to Contentful.com's "Introduction to Fastify: A practical guide to building Node.js web apps" tutorial.

## Running the project

In the project directory, you can run:

### `npm run dev`

To start the app in dev mode.

Open [http://localhost:3000/get_time](http://localhost:3000/get_time) to view the route in the browser.

or you can run

### `npm run start`

To start the app in production mode. This is needed for the /shopping_list route which uses a Prisma database. The dev script (see package.json) includes a "-w" watch flag which causes unexpected reloads and a 503 error so it's better to use production mode to avoid this.
