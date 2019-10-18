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
    res.render('new_order');
  });

  router.get("/send_text", (req, res) => {
    twilioClient.messages
      .create({
        to: '+17782305559',
        from: '+17609708429',
        body: "This is a text message from the app!"
      })
      .then((message) => console.log(message.sid));

    twilioClient.messages
      .create({
        to: '+16047806378',
        from: '+17609708429',
        body: "This is a text message from the app!"
      })
      .then((message) => console.log(message.sid));

    res.redirect("/api/orders/new");
  });

  return router;
};
