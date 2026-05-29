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

searchButton.addEventListener("click", getStockData);

async function getStockData() {

  const symbol =
    symbolInput.value.toUpperCase();

  if (!symbol) return;

  const apiKey =
    "XMJO7OCB6M3I09J9";

  const url =
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&outputsize=full&symbol=${symbol}&apikey=${apiKey}`;

  try {

    const response =
      await fetch(url);

    const data =
      await response.json();

    console.log(data);

    const timeSeries =
      data["Time Series (Daily)"];

    const dates =
      Object.keys(timeSeries).reverse();

    const prices =
      dates.map(date =>
        Number(timeSeries[date]["4. close"])
      );

    const latestPrice =
      prices[prices.length - 1];

    const previousPrice =
      prices[prices.length - 2];

    const change =
      latestPrice - previousPrice;

    companyName.innerText =
      symbol;

    priceText.innerText =
      `Price: $${latestPrice.toFixed(2)}`;

    changeText.innerText =
      `Daily Change: ${change.toFixed(2)}`;

    drawChart(dates, prices, symbol);

  }

  catch (error) {

    console.error(error);

    alert(error.message);

  }

}

function drawChart(dates, prices, symbol) {

  const ctx =
    document.getElementById("priceChart");

  if (chart) {

    chart.destroy();

  }

  chart = new Chart(ctx, {

    type: "line",

    data: {

      labels: dates,

      datasets: [{

        label: `${symbol} Price`,

        data: prices

      }]

    }

  });

}
