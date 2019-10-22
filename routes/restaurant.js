const express = require('express');
const router  = express.Router();

module.exports = (db, twilioClient) => {

  // router.get("/employee", (req, res) => {
  //   res.render('restaurant/orders');
  // });

router.get("/employee", (req, res) => {
  db.query(`SELECT orders.id, orders.customer_phone, line_items.quantity, menu_items.menu_item_name
    FROM line_items
    JOIN orders ON orders.id = order_id
    JOIN menu_items ON menu_items.id = menu_item_id;
    `)
    .then(data => {
      const lineItems = data.rows;
      console.log(lineItems)
      res.render('restaurant/orders'),{ lineItems };
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});
return router;
};
