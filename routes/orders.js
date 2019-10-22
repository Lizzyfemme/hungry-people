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
    let orderID;
    const restaurantPhone = '7782305559';
    const customerPhone = req.body.customer_phone;
    const orderedAt = new Date();
    const values = [customerPhone, orderedAt];

    db.query(`
    INSERT INTO orders (customer_phone, ordered_at)
    VALUES ($1, $2)
    RETURNING *;
    `, values)
      .then(orderData => {
        orderID = orderData.rows[0].id;
        const idParams = req.body.menu_item_id;
        const qtyParams = req.body.menu_item_quantity;
        const lineItemRows = [];

        for (let i = 0; i < idParams.length; i ++) {
          if (qtyParams[i] > 0) {
            lineItemRows.push(`(${idParams[i]}, ${orderID}, ${qtyParams[i]})`);
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
          to: restaurantPhone,
          from: '+17609708429',
          body: `
A customer has placed an order!
Please let the customer know how long their order will take by going to:
http://localhost:8080/restaurant/orders/${orderID}
`
        });
      })
      .then(() => {
        res.redirect(`/orders/checkout/${orderID}`);
      })

      //implement another .then function to call back the selected items and recalculate the total price plus tax???

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

  router.get("/checkout/:orderID", (req, res) => {
    let menu_item;

    db.query(`
    SELECT menu_items.menu_item_name, menu_items.price, line_items.quantity
    FROM menu_items
    JOIN line_items ON menu_item_id = menu_items.id
    JOIN orders ON order_id = orders.id
    WHERE orders.id = $1;
    `, [req.params.orderID])
      .then(lineItemsData => {
        const lineItems = lineItemsData.rows;
        res.render('orders/checkout', { lineItems:lineItems });
      })
      .catch(err=> {
        res
          .status(500)
          .json({error: err.message });
      });
  });

  return router;
};
