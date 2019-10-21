$(() => {
  const $quantityInputs = $('.qty');
  $quantityInputs.change((el) => {
    updateTotal();
  });
  // $quantityInputs.each(function (index) {
  //   $(this).siblings(".menu_item_price").value;
  // });
});

const updateTotal = () => {
  const $subTotal = $('#sub-total');
  let subTotal = 0.00;
  const $quantityInputs = $('.qty');

  $quantityInputs.each(function (index) {
    const qty = Number.parseInt(this.value);
    const price = $(this).parent().siblings(".menu_item_price")[0].value.slice(1);

    subTotal += qty * price;
  });

  $subTotal.text(`$${subTotal.toFixed(2)}`);
};
