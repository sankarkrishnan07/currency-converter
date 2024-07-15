import { useEffect } from "react";
import "./App.css";
import { useState } from "react";

function App() {
  return <CurrencyConverter />;
}

function CurrencyConverter() {
  const [fromCur, setFromCur] = useState("INR");
  const [toCur, setToCur] = useState("USD");
  const [amount, setAmount] = useState("1");
  const [converted, setConverted] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function fetchConvertedValue() {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
        );
        const data = await res?.json();
        setConverted(data.rates[toCur]);
        setIsLoading(false);
      }

      if (fromCur === toCur) return setConverted(amount);
      fetchConvertedValue();
    },
    [amount, fromCur, toCur]
  );

  return (
    <div className="container">
      <div className="input__container">
        <input
          type="text"
          name="value"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          name="from-currency"
          id="from-currency"
          value={fromCur}
          onChange={(e) => setFromCur(e.target.value)}
          disabled={isLoading}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <select
          name="to-currency"
          id="from-currency"
          value={toCur}
          onChange={(e) => setToCur(e.target.value)}
          disabled={isLoading}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
      </div>
      <p className="output">
        {converted} {toCur}
      </p>
    </div>
  );
}

export default App;
