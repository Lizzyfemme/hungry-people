const express = require('express');
const router  = express.Router();

module.exports = (db, twilioClient) => {

  router.get("/employee", (req, res) => {
    res.render('restaurant/orders');
  });

  return router;
};
