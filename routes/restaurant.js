const express = require('express');
const router  = express.Router();

module.exports = (db, twilioClient) => {

  router.get("/orders/:orderID", (req, res) => {
    let order;

    db.query(`SELECT * FROM orders WHERE id = $1`, [req.params.orderID])
      .then(orderData => {
        order = orderData.rows[0];

        return db.query(`
        SELECT *
        FROM line_items
        JOIN menu_items ON line_items.menu_item_id = menu_items.id
        WHERE order_id = $1;
        `, [orderData.rows[0].id]);
      })
      .then(lineItemData => {
        order.lineItems = lineItemData.rows;

        res.render('restaurant/order', { order });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/orders/message", (req, res) => {
    console.log("hello");
    console.log(req.body);
    const customer = req.body['customer_phone'];
    const message = req.body.msg;
    console.log(Object.keys(req.body));
    return twilioClient.messages.create({
      to: customer,
      from: '+17609708429',
      body: `${message}`
    })
    .then(() => {
      res.redirect("/restaurant/employee");
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  router.post("/orders/:orderID", (req, res) => {
    const receivedAt = new Date();
    const customerPhone = req.body.customer_phone;
    const prepTime = req.body.prep_time;

    db.query(`
    UPDATE orders
    SET received_at = $1, prep_time = $2
    WHERE id = $3
    `, [ receivedAt, prepTime, req.params.orderID ])
      .then(() => {
        return twilioClient.messages.create({
          to: customerPhone,
          from: '+17609708429',
          body: `
Your order has been received and will be ready in approximately ${prepTime} minutes. See you then!
`
        });
      })
      .then(() => {
        res.redirect("/restaurant/employee");
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/employee", (req, res) => {
    db.query(`SELECT orders.id, orders.customer_phone, string_agg(CONCAT (line_items.quantity, ' &times; ', menu_items.menu_item_name), ', ') AS pizza, orders.prep_time, orders.received_at
  FROM line_items
  JOIN orders ON orders.id = order_id
  JOIN menu_items ON menu_items.id = line_items.menu_item_id
  WHERE orders.completed_at IS NULL
  GROUP BY orders.id
  ORDER BY orders.id;
    `)
      .then(data => {
        const lineItems = data.rows;
        res.render('restaurant/orders', { lineItems:lineItems });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/orders/:orderID/complete", (req, res) => {
    const orderID = req.params.orderID;
    const completedAt = new Date();

    db.query(`
UPDATE orders SET completed_at = $1 WHERE id = $2 RETURNING *;
    `, [completedAt, orderID])
      .then(orderData => {
        const order = orderData.rows[0];

        return twilioClient.messages.create({
          to: order.customer_phone,
          from: '+17609708429',
          body: `
Your order is ready! Come get it while it's hot!
`
        });
      })
      .then(() => {
        res.redirect("/restaurant/employee");
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  return router;
};
