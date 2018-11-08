const express = require("express");
const router = express.Router();
const knex = require("../db/client");

router.get("/", (req, res) => {
  knex("clucks")
    .orderBy("created_at", "desc")
    .then((clucks) => {
      console.log(clucks);
      res.render("welcome", { clucks: clucks });
    });
});

router.get("/clucks", (req, res) => {
  res.redirect("/");
});

router.get("/sign_in", (req, res) => {
  res.render("signIn");
});

router.get("/new_cluck", (req, res) => {
  res.render("createCluck");
});

router.post("/sign_in", (req, res) => {
  const username = req.body.username;

  res.cookie("username", username);
  res.redirect("/");
});

router.post("/new_cluck", (req, res) => {
  knex("clucks")
    .insert({
      username: req.cookies.username,
      content: req.body.content,
      image_url: req.body.image_url
    })
    .returning("*")
    .then(() => {
      res.redirect("/");
    })
});

router.post("/sign_out", (req, res) => {
  res.clearCookie("username");
  res.redirect("/");
})

module.exports = router;