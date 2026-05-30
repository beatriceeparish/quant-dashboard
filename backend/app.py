from flask import Flask, jsonify
from flask_cors import CORS
import yfinance as yf

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Flask is working"

@app.route("/stock/<ticker>")
def get_stock(ticker):

    stock = yf.Ticker(ticker)

    hist = stock.history(period="max")

    dates = hist.index.strftime("%Y-%m-%d").tolist()

    prices = hist["Close"].round(2).tolist()

    return jsonify({
        "ticker": ticker.upper(),
        "dates": dates,
        "prices": prices
    })

if __name__ == "__main__":
    app.run(debug=True)