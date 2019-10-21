$(() => {
  const $quantityInputs = $('.qty');
  const form = $('form');
  $quantityInputs.change((el) => {
    updateTotal();
  });

  form.on("submit", (event) => {
    const input = $("input[name=customer_phone]").val();
    const qty = $("input[name=menu_item_quantity]");
    validatePhone(input);
    validateQty(qty);
  });
});

const validatePhone = (input) => {
  if (input === "") {
    event.preventDefault()
    const exisitingError = $('.error-message').text();
    $('.error-message').html(`${exisitingError} <br> You forgot to let us know your phone number.`);
    $(".hiddenError").removeClass("error");
    $(".hiddenError").slideDown("slow");
  };
};

const validateQty = (qty) => {
  let totalPizza = 0;
  for (let i = 0; i < qty.length; i++) {
    totalPizza += Number.parseInt($(qty[i]).val());
  }
  if (totalPizza === 0) {
    event.preventDefault();
    const exisitingError = $('.error-message').text();
    $('.error-message').html(`${exisitingError} <br> You forgot your pizza!`);
    $(".hiddenError").removeClass("error");
    $(".hiddenError").slideDown("slow");
  };
};

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
