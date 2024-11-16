require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { connectMongoDB, connectPostgres, sequelize } = require("./config/db");
const traceMiddleware = require("./middlewares/traceMiddleware");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const { logger } = require("./utils/logger");

const app = express();

// Middleware for Trace ID
app.use(traceMiddleware);

app.use(express.json());

// Read environment variables
const PORT = process.env.PORT || 4000; // Default to 4000 if not provided
const NODE_ENV = process.env.NODE_ENV || "development";

// Graceful shutdown handler
const gracefulShutdown = () => {
  logger.info("Shutting down server...");
  server
    .stop()
    .then(() => {
      logger.info("Server stopped.");
      process.exit(0);
    })
    .catch((err) => {
      logger.error("Error during shutdown:", err);
      process.exit(1);
    });
};

app.get("/", (req, res) => {
  res.send(
    "<h1>Welcome to BookHive</h1><p>Visit <a href='/graphql'>/graphql</a> to use the API.</p>"
  );
});

// Initialize databases
(async () => {
  try {
    logger.info("Initializing databases...");

    // Connect to PostgreSQL
    await connectPostgres();
    await sequelize.sync({ force: false });

    // Connect to MongoDB
    await connectMongoDB();

    logger.info("Databases connected successfully.");
  } catch (error) {
    logger.error(`Error initializing databases: ${error.message}`);
    process.exit(1);
  }
})();

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ sequelize }),
  introspection: NODE_ENV === "development", // Enable introspection in development
  playground: NODE_ENV === "development", // Enable playground in development
});

(async () => {
  try {
    await server.start();
    server.applyMiddleware({ app });

    app.listen({ port: PORT }, () => {
      logger.info(
        `Server running at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  } catch (error) {
    logger.error(`Error starting Apollo server: ${error.message}`);
    process.exit(1);
  }
})();

// Handle graceful shutdown for signals
process.on("SIGINT", gracefulShutdown); // Ctrl+C
process.on("SIGTERM", gracefulShutdown); // Kubernetes / Cloud platforms
