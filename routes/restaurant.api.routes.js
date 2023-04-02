var express = require("express");
const path = require("path");
var router = express.Router();
/* modules */
var Restaurant = require("../modules/functions/restaurants.logic");



/* GESTIONE ROUTING REACT E VARI REFRESH RICHIESTI DAL BROWSER */
router.get("/getRestaurants/:skip/:take", function (req, res, next) {
  const { skip, take } = req.params;

  if (!skip || isNaN(skip) || !take || isNaN(take)) {
    /* skip or take not defined */
    res.status(500).send(err);
  }

    Restaurant.getRestaurantsList(skip,take)
      .then((result) => {
  
        
        res.status(200).send(result);
      })
      .catch((err) => {
        console.log("ERROR:", err);
        res.status(500).send(err);
      });
  
});

router.post("/downloadImagesByList", function (req, res, next) {
  let arrImages = req.body;

  if (arrImages && arrImages.length > 0) {
    Crawler.getDownloadAllImagesByList(arrImages)
      .then((result) => {
        /* console.log(result); */
        res.status(200).send(result);
      })
      .catch((err) => {
        console.log("ERROR:", err);
        res.status(500).send(err);
      });
  } else {
    res.status(500).send("No images were passed, or array lenght is 0'");
  }
});

module.exports = router;
