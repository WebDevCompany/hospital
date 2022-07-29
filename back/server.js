const express = require("express");
const bodyParser = require("body-parser");
const { createPool } = require("mysql2");
const { resolve } = require("path");
const nodemailer = require("nodemailer");
const { HOST, USER, PASSWORD, DB } = require("./config/db.config");
const { MAILUSER, PASS, MAILHOST } = require("./config/mailer.config");

const rand = () => Math.floor(Math.random() * (9991 - 1004 + 1) + 1000);

const transporter = nodemailer.createTransport(
  {
    host: MAILHOST,
    port: 465,
    secure: true,
    auth: {
      user: MAILUSER,
      pass: PASS,
    },
    logger: true,
    transactionLog: true, // include SMTP traffic in the logs
    allowInternalNetworkInterfaces: false,
    tls: {
      rejectUnauthorized: false,
    },
  },
  { from: "Hospital <" + MAILUSER + ">" }
);

function mailer(message) {
  transporter.sendMail(message, (err, info) => {
    if (err) return console.log(err);
    console.log("Email send: ", info);
  });
}

let validationCode = "";

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
  pool_hospital.query("SELECT * FROM users", (err, result, fields) => {
    if (!err) {
      res.json({ message: "Connect" });
    } else {
      console.log(err);
    }
  });
});

server.post("/registration", (req, res) => {
  let t = req.body;
  pool_hospital.query(
    `SELECT * FROM users WHERE name="${t.name}"`,
    (err, result, fields) => {
      if (!err) {
        if (result.length !== 0) {
          res.json("name is occupied");
        } else {
          res.json({ isGood: "ok" });
        }
      } else {
        console.log(err);
      }
    }
  );
});

server.post("/login", (req, res) => {
  let t = req.body;
  pool_hospital.query(
    `SELECT * FROM users WHERE name="${t.name}" AND pass="${t.pass}"`,
    (err, result, fields) => {
      console.log(result);
      if (!err) {
        if (result.length !== 0) {
          res.json({ isGood: "ok", result: result[0] });
        } else {
          res.json("name is not found");
        }
      } else {
        console.log(err);
      }
    }
  );
});

server.post("/auth", (req, res) => {
  validationCode = rand();
  let t = req.body;
  let message = {
    to: `${t.email}`,
    subject: "код поддвеждения регистрации",
    html: `<p>Здаствуйте, если код подтверждения предназначался не вам просто проигнорируйте его </p><hr/><b>${validationCode}</b><hr/>`,
  };
  mailer(message);
  res.send("ok");
});

server.post("/code", (req, res) => {
  let t = req.body;
  if (+req.body.code === +validationCode) {
    pool_hospital.query(
      `INSERT INTO users( name, pass, tel, email) VALUES ("${t.name}", "${t.pass}", "${t.tel}", "${t.email}")`,
      (err, result, failed) => {
        if (!err) {
          res.json({ isGood: "ok" });
        } else {
          console.log(err);
        }
      }
    );
  } else {
    res.json("no valid");
  }
});

server.use((req, res) => {
  res.send("error");
});

server.listen(4000, () => console.log("http://localhost:4000"));
