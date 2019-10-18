# User Stories

## From user's perspective

As a user
I want to have the ability to order on the go
Because I'm busy

### Scenarios

- Given I am on the home page
- When I click the create order link
- Then I should be presented with a list of menu items

- Given I am on the home page
- When I click the create order link
- Then I should receive an SMS saying that my order has been received and I will
  receive confirmation from the restaurant

## From restaurant perspective

As a restaurant owner
I want to offer online order and pickup to my customers
So that I can manage my orders better, keep track of marketing data

- Given I am on the back-end site
- When I look at the list of orders
- Then I should only see active orders in the order they were received

- Given nothing
- When a customer places an order
- Then I should receive an SMS with the order

- Given that I have received an order
- When I complete the order
- Then the customer should get an SMS with a completion message
