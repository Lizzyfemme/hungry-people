const express = require('express');
const router  = express.Router();

module.exports = (db, twilioClient) => {

  router.get("/employee", (req, res) => {
    res.render('restaurant/orders');
  });

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

  router.post("/orders/:orderID", (req, res) => {
    const receivedAt = new Date();
    const customerPhone = req.body.customer_phone;
    const prepTime = req.body.prep_time;

    db.query(`
    UPDATE orders
    SET received_at = $1
    WHERE id = $2
    `, [ receivedAt, req.params.orderID ])
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

  return router;
};
