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

  return router;
};
