import express from "express";
const app = express();
app.get("/", (req, res) => {
  res.send("feed back");
});

app.listen(3000, () => {
  console.log("server is connected at 3000");
});
