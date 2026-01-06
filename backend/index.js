const express = require("express");
const app = express();
const cors = require("cors");
const route = require("./src/routes/route");

// parse JSON body
app.use(express.json());


// enable CORS cho tất cả các request
app.use(cors());

app.use("/api", route);


app.get("/", (req, res) => {
  res.send("home");
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server chạy tại http://localhost:${PORT}`));
