const app = require("./app");
const connectDatabase = require("./config/database");

const dotenv = require("dotenv");

//handling the uncaught exception
process.on("uncaughtException", (err) => {
    console.log(`ERROR: ${err.stack}`);
    console.log("UNCAUGHT EXCEPTION! Shutting down...");
    process.exit(1);
});

//setting up the config files
dotenv.config({ path: "backend/config/config.env" });

// Connection to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on : ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  console.log(`Unhandled Rejection at: ${promise}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});