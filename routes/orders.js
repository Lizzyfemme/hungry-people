/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db, twilioClient) => {
  router.post("/", (req, res) => {
    const customerPhone = req.params.customer_phone;
    const orderedAt = new Date();
    const values = [customerPhone, orderedAt];

    db.query(`
    INSERT INTO orders (customer_phone, ordered_at)
    VALUES ($1, $2)
    RETURNING *;
    `, values)
      .then(orderData => {
        const idParams = req.body.menu_item_id;
        const qtyParams = req.body.menu_item_quantity;
        const lineItemRows = [];

        for (let i = 0; i < idParams.length; i ++) {
          if (qtyParams[i] > 0) {
            lineItemRows.push(`(${idParams[i]}, ${orderData.rows[0].id}, ${qtyParams[i]})`);
          }
        }

        const valuesString = lineItemRows.join(',\n') + ";";

        return db.query(`
        INSERT INTO line_items (menu_item_id, order_id, quantity)
        VALUES ${valuesString};
        `);
      })
      .then(() => {
        return twilioClient.messages.create({
          to: req.body.customer_phone,
          from: '+17609708429',
          body: `
Thank you for placing an order with Bufala!
We'll send you a text shortly to let you know how long your order will take.
`
        });
      })
      .then(() => {
        return twilioClient.messages.create({
          to: '7782305559',
          from: '+17609708429',
          body: `
A customer has placed an order!
Go to your orders dashboard to let the customer know how long their order will be.
`
        });
      })
      .then(() => {
        res.redirect('/orders/checkout');
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

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
