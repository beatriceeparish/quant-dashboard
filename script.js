const searchButton =
  document.getElementById("searchButton");

const symbolInput =
  document.getElementById("symbolInput");

const companyName =
  document.getElementById("companyName");

const priceText =
  document.getElementById("price");

const changeText =
  document.getElementById("change");

let chart;

searchButton.addEventListener(
  "click",
  getStockData
);

async function getStockData() {

  const symbol =
    symbolInput.value.toUpperCase();

  if (!symbol) return;

  try {

    const response =
      await fetch(
        `http://127.0.0.1:5000/stock/${symbol}`
      );

    const data =
      await response.json();

    const dates =
      data.dates;

    const prices =
      data.prices;

    const latestPrice =
      prices[prices.length - 1];

    const previousPrice =
      prices[prices.length - 2];

    const change =
      latestPrice - previousPrice;

    const firstPrice =
      prices[0];

    const yearlyReturn =
      ((latestPrice - firstPrice) /
        firstPrice) * 100;

    const high52 =
      Math.max(...prices);

    const low52 =
      Math.min(...prices);

    companyName.innerText =
      data.ticker;

    priceText.innerHTML =
      `
      Current Price: $${latestPrice.toFixed(2)}
      <br>
      1 Year Return:
      ${yearlyReturn.toFixed(2)}%
      `;

    changeText.innerHTML =
      `
      Daily Change:
      ${change.toFixed(2)}
      <br>
      52 Week High:
      $${high52.toFixed(2)}
      <br>
      52 Week Low:
      $${low52.toFixed(2)}
      `;

    drawChart(
      dates,
      prices,
      data.ticker
    );

  }

  catch (error) {

    console.error(error);

    alert(
      "Error loading stock data."
    );

  }

}

function drawChart(
  dates,
  prices,
  ticker
) {

  const ctx =
    document.getElementById(
      "priceChart"
    );

  if (chart) {

    chart.destroy();

  }

  chart = new Chart(ctx, {

    type: "line",

    data: {

      labels: dates,

      datasets: [{

        label:
          `${ticker} Price`,

        data: prices,

        tension: 0.1

      }]

    },

    options: {

      responsive: true,

      maintainAspectRatio: false

    }

  });

}
