const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");

const SERVICE_NUMBER = Math.random();

mongoose
  .connect("mongodb://mongoadmin:secret@mongodb:27017/test?authSource=admin")
  .then(
    () => {
      console.log("Connected to mongo!!!");
    },
    (err) => {
      console.log(err);
    }
  );

const schema = new mongoose.Schema({ name: "string", size: "string" });
const Tank = mongoose.model("Tank", schema);

app.get("/", (req, res) => {
  res.send(`Hello World! ${SERVICE_NUMBER}`);
});

app.get("/insert", (req, res) => {
  Tank.create({ size: "small" }, function (err, small) {
    if (err) return handleError(err);
    res.send("Inserted!");
  });
});

app.get("/all", async (req, res) => {
  const datas = await Tank.find({});

  res.send(datas);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port} ${SERVICE_NUMBER}`);
});
