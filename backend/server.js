const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const PORT = process.env.PORT || 3500;
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const path = require("path");
const bodyParser = require('body-parser');


app.use(logger);

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
app.post("/test", async (req, res) => {
  const { fname} = req.body;
  console.log(req.body);
  res.status(201).json({'success': `New user ${fname} is created. Please login again.`})
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
