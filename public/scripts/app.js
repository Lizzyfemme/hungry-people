$(() => {
  const $quantityInputs = $('.qty');
  const form = $('form.new-order');
  const $timers = $('.timer');
  $($(".cart")[0]).hide();

  $quantityInputs.change((el) => {
    updateTotal();
  });

  form.on("submit", (event) => {
    const input = $("input[name=customer_phone]").val();
    const qty = $("input[name=menu_item_quantity]");
    $('.error-message').html(``);
    validatePhone(input);
    validateQty(qty);
  });

  $timers.each(function () {
    const $timer = $(this);

    if ($timer.data("received-at")) {
      window.setInterval(calcTimeRemaining, 1000, $timer);
    }
  });
});

const calcTimeRemaining = ($timer) => {
  const receivedAt = new Date($timer.data("received-at"));
  const dueAt = new Date(receivedAt.setMinutes(receivedAt.getMinutes() + $timer.data("prep-time")));
  const timeRemaining = dueAt - new Date();
  const minutesRemaining = Math.floor(timeRemaining / 60000);
  const secondsRemaining = Math.abs(Math.floor((timeRemaining % 60000) / 1000));

  $timer.text(`${minutesRemaining}min, ${secondsRemaining}sec`);
  if (timeRemaining < 0) {
    $timer.addClass("overdue");
  }
};

const validatePhone = (input) => {
  if (input === "") {
    event.preventDefault();
    const exisitingError = $('.error-message').text();
    $('.error-message').html(`${exisitingError} <br> You forgot to let us know your phone number.`);
    $(".hiddenError").removeClass("error");
    $(".hiddenError").slideDown("slow");
  };
};

const validateQty = (qty) => {
  let totalPizza = 0;
  console.log(qty);
  for (let i = 0; i < qty.length; i++) {
    const quantity = Number.parseInt($(qty[i]).val()) || 0;
      totalPizza += quantity;
  };
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
  const $cart = $($(".cart")[0]);

  $quantityInputs.each(function (index) {
    const qty = Number.parseInt(this.value) || 0;
    const menuItemEl = $(this).parentsUntil("article").parent()[0];
    const price = $(menuItemEl).find(".menu_item_price")[0].value.slice(1);

    subTotal += qty * price;
  });

  if (subTotal === 0) {
    $cart.slideUp();
  } else {
    $cart.slideDown();
  }

  $subTotal.text(`$${subTotal.toFixed(2)}`);
};
