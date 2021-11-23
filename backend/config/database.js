const mongoose = require("mongoose");

// Connect to MongoDB
const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI).then((con) => {
      console.log(`MongoDB Database connected with HOST: ${con.connection.host}` );
    }).catch((err) => {
      console.log(err);
    });
};

// Export the database connection
module.exports = connectDatabase;
