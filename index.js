
document.addEventListener("DOMContentLoaded", fetchBitcoinPrice)

let initialDate = "2021-01-08"
let initialPurchasePrice = 40759.48
let bitcoinOwned = 0.029441

let url = "https://api.coindesk.com/v1/bpi/currentprice/BTC.json"

function fetchBitcoinPrice() {
  fetch(url)
    .then( (response) => response.json() )
    .then( (jsonData) => jsonData["bpi"] )
    .then( (bpiData) =>  bpiData["USD"] )
    .then( usdData => usdData.rate )
    .then( rateString => {
      let rateWithoutCommas = rateString.replace(",", "")
      let rateValue = parseFloat(rateWithoutCommas)
      let currentPrice = bitcoinOwned * rateValue

      let isGain = currentPrice - 1200 > 0
      let styleColor = isGain ? "green" : "red"

      let element = document.getElementById("gr-pot-price")
      element.innerHTML = "$" + currentPrice
      element.style.color = styleColor
    })
}
