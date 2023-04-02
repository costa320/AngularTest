var express = require("express");
const path = require("path");
var router = express.Router();
/* modules */
const CuisinesNameList = require('../modules/data/CuisinesNameList.json');


/* GESTIONE ROUTING REACT E VARI REFRESH RICHIESTI DAL BROWSER */
router.get("/getCuisinesList", function (req, res, next) {
  res.status(200).send(CuisinesNameList);
});

module.exports = router;
