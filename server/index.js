const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const mysql = require("mysql2");

// middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// database connection
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "shahin12@#",
  database: "crud_api",
});

// get all user
app.get("/api/get", (req, res) => {
  const sqlGet = "select * from contact_db";
  db.query(sqlGet, (err, result) => {
    console.log(err);
    res.send(result);
  });
});

// get a user
app.get("/api/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "select * from contact_db where id=?";
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

// post user
app.post("/api/post", (req, res) => {
  const { name, email, contact } = req.body;
  const sqlInsert =
    "insert into contact_db(name, email, contact) values(?,?,?)";
  db.query(sqlInsert, [name, email, contact], (error, result) => {
    if (error) {
      console.log(error);
    }
  });
  res.send("post successfull!");
});

// delete user
app.delete("/api/remove/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "delete from contact_db where id=?";
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.log(error);
    }
  });
  res.send("contact deleted successfully!");
});

// update user
app.put("/api/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, contact } = req.body;
  const sqlUpdate =
    "update contact_db set name=?, email=?, contact=? where id=?";
  db.query(sqlUpdate, [name, email, contact, id], (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

// get user
app.get("/", (req, res) => {
  const sqlInsert =
    "insert into contact_db(name, email, contact) values('Shahin','shahin@gmail.com','01882555761')";
  db.query(sqlInsert, (err, result) => {
    console.log(err);
    console.log(result);
  });
  res.send("insert successfull!");
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on port 5000!");
});
