$(() => {
  const $quantityInputs = $('.qty');
  $quantityInputs.change((el) => {
    updateTotal();
  });
});

const updateTotal = () => {
  const $subTotal = $('#sub-total');
  let subTotal = 0.00;
  const $quantityInputs = $('.qty');

  $quantityInputs.each(function (index) {
    const qty = Number.parseInt(this.value);
    const menuItemEl = $(this).parentsUntil("article").parent()[0];
    const price = $(menuItemEl).find(".menu_item_price")[0].value.slice(1);

    subTotal += qty * price;
  });

  $subTotal.text(`$${subTotal.toFixed(2)}`);
};
