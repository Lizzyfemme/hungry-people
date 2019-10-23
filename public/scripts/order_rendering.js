/* renderOrders is a function that adds an order to the top of the the order table*/
const renderOrders = function(orders) {
  for (let order of orders) {
    console.log( "renderOrders: ", order);
    const $orderElement = createOrder(order);
    $('.main_table').append($orderElement);
  }
};
/* createOrder is a function that adds the HTML markup to an order so that it can appear on the table, it is a callback in the renderOrders function*/
const createOrder = function(order) {
  const markup = `
  <tr>
      <td>${order.lineItem.id}</td>
      <td>${order.lineItem.customer_phone}</td>
      <td>${order.lineItem.pizza}</td>
      <td><button>message</button></td>
      <td>
        <% if (lineItem.completed_at) { %>
        <span>Already done!</span>
        <% } else { %>
        <form action="/restaurant/orders/<%= lineItem.id %>/complete" method="post">
          <input type="submit" value="Complete">
        </form>
        <% } %>
      </td>
    </tr>

`;

  let $orderElement = $('<table></table>').addClass('.main_table');
  $orderElement.html(markup);
  return $orderElement;
};
//loadTweets is a function that retrieve tweets
const renderOrders = function() {
  $.ajax({
    url: "/restaurant/employee",
    method: "GET",
    success: function(data) {
      $('.main_table').html('');
      renderOrders(data);
    }
  });
};
