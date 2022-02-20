import { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow.js';

const BASE_URL = `https://api.exchangeratesapi.io/latest`
const rates = {
  USD: 1,
  EUR: 0.88
}

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)

  let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json)
      .then(data => {
        const firstCurrency = Object.keys(rates)[0]
        setCurrencyOptions([data.base, ...Object.keys(rates)])
        setFromCurrency(data.base)
        setToCurrency(firstCurrency)
        setExchangeRate(rates[firstCurrency])

        // const firstCurrency = Object.keys(data.rates)[0]
        // setCurrencyOptions([data.base, ...Object.keys(data.rates)])
        // setFromCurrency(data.base)
        // setToCurrency(firstCurrency)
        // setExchangeRate(data.rates[firstCurrency])
      })
  }, [])

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])

  const handleFromAmountChange = (event) => {
    setAmount(event.target.value)
    setAmountInFromCurrency(true)
  }
  const handleToAmountChange = (event) => {
    setAmount(event.target.value)
    setAmountInFromCurrency(false)
  }

  return (
    <div className="App">
      <h1>Convert</h1>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={event => setFromCurrency(event.target.value)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
      />
      <div className='equals'>=</div>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={event => setToCurrency(event.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
      />
    </div>
  );
}

export default App;
