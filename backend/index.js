const express = require("express");
const app = express();
const cors = require("cors");
const route = require("./src/routes/route");
const cookieParser = require('cookie-parser');

// parse JSON body
app.use(express.json());

app.use(cookieParser());

app.use(cors({
  origin: (origin, callback) => {
    
    if (!origin) return callback(null, true);


    if (origin.startsWith("http://localhost")) {
      return callback(null, true);
    }


    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));

app.use("/api", route);


app.get("/", (req, res) => {
  res.send("home");
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server chạy tại http://localhost:${PORT}`));
