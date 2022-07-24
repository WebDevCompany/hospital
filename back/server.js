const express = require("express");
const bodyParser = require("body-parser");
const { createPool } = require("mysql2");
const { HOST, USER, PASSWORD, DB } = require("./config/db.config");
const { resolve } = require("path");

const pool_hospital = createPool({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DB,
  waitForConnections: true,
  connectionLimit: 30,
  queueLimit: 30,
});

const server = express();
server.use(express.static(resolve(__dirname, "../front/build")));
server.use(bodyParser.json());

server.get("/", (req, res) => {
  res.sendFile(resolve(__dirname, "../front/build/index.html"));
});

server.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

server.get("/connect", (req, res) => {
  pool_hospital.query("SELECT * FROM prods", (err, result, fields) => {
    if (!err) {
      res.send("connect");
    } else {
      console.log(err);
    }
  });
});

server.use((req, res) => {
  res.send("error");
});

server.listen(3000, () => console.log("http://localhost:3000"));
