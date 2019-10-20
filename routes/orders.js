/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db, twilioClient) => {
  router.get("/new", (req, res) => {
    db.query(`SELECT id, menu_item_name, description, photo_url, price FROM menu_items;`)
      .then(data => {
        const menuItems = data.rows;
        res.render('orders/order', { menuItems });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/checkout", (req, res) => {
    res.render('orders/checkout');
  });


  return router;
};
