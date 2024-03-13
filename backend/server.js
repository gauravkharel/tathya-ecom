const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const PORT = process.env.PORT || 3500;
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const path = require("path");
const bodyParser = require("body-parser");
const credentials = require("./middleware/credentials");
const verifyJWT = require("./middleware/verifyJWT");

app.use(logger);
app.use(credentials);

app.use(cors(corsOptions));

// build-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cookieParser());

//serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

//routes
app.get("/users", async (req, res) => {});
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
// app.use("/logout", require("./routes/logout"));

app.use(verifyJWT);
app.use("/products", require("./routes/api/clothing"));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
