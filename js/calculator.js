// Добавьте этот код в вашем файле calculator.js

let totalPrice = 0;  // Глобальная переменная для хранения итоговой стоимости

const tariff = Array.from(document.querySelectorAll(".tariff"));
const option = Array.from(document.querySelectorAll(".option"));
const time = document.querySelector("#time");
const volume = document.querySelector("#volume");
const total = document.querySelector("#total");

const orderTariff = document.querySelector("#order_tariff");
const orderTime = document.querySelector("#order_time");
const orderOption = document.querySelector("#order_option");

tariff.forEach((el) => {
  el.addEventListener("click", tariffUpdate);
});

time.addEventListener("input", timeUpdate);

option.forEach((el) => {
  el.addEventListener("change", optionUpdate);
});

function tariffUpdate(e) {
  currentSet.tariff = e.target.id;
  updatePrice();
  orderUpdate();
}

function timeUpdate(e) {
  currentSet.time = time.value;
  volume.value = currentSet.time;
  updatePrice();
  orderUpdate();
}

function optionUpdate(e) {
  e.stopPropagation();
  if (e.target.checked) {
    currentSet.option.push(e.target.id);
  } else {
    let index = currentSet.option.indexOf(e.target.id);
    currentSet.option.splice(index, 1);
  }
  updatePrice();
  orderUpdate();
}

function updatePrice() {
  let tariffPrice = currentSet.getTariffPrice();
  let optionPrice = currentSet.getOptionPrice();
  totalPrice = currentSet.time * tariffPrice + optionPrice;  // Обновление глобальной переменной
  total.value = totalPrice.toLocaleString() + ' ₽';
}

function orderUpdate() {
  if (currentSet.time < 5) {
    orderTime.value = currentSet.time + " часа";
  } else {
    orderTime.value = currentSet.time + " часов";
  }
  orderTariff.textContent = currentSet.getTariffPrice() + " ₽/час";
  orderOption.textContent = currentSet.getOptionPrice() + " ₽";

}

const priceInfo = {
  tariff: {
    economy: 500,
    standart: 800,
    premium: 1200,
  },
  option: {
    option1: 300,
    option2: 500,
    option3: 300,
    option4: 500,
  },
};

let currentSet = {
  tariff: "standart",
  time: 1,
  option: [],
  getTariffPrice() {
    return priceInfo.tariff[this.tariff];
  },
  getOptionPrice() {
    let optionPrice = 0;
    if (!this.option.length == 0) {
      this.option.forEach((el) => {
        optionPrice += priceInfo.option[el];
      });
    }
    return optionPrice;
  },
};

// Функция обновления итоговой стоимости с добавлением символа рубля
function updateTotal(cost) {
    const totalElement = document.getElementById('total');
    totalElement.textContent = cost.toLocaleString() + ' ₽';
}
