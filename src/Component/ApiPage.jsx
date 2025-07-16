import React, { useEffect, useState } from "react";
import axios from "axios";

const ApiPage = () => {
  const [current, setCurrent] = useState(null);
  const [start, setStart] = useState(1); 
  const [amount, setAmount] = useState("USD"); 
  const [final, setFinal] = useState(null); 

  const Api = async () => {
    try {
      const result = await axios.get(
        `https://v6.exchangerate-api.com/v6/${
          import.meta.env.VITE_MY_API
        }/latest/NGN`
      );
      setCurrent(result.data.conversion_rates);
      console.log(result.data.conversion_rates);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Api();
  }, []);

  const handleFinal = () => {
    if (!current || !amount) return;
    const rate = current[amount];
    const converted = (start * rate).toFixed(2);
    setFinal(converted);
  };

  useEffect(() => {
    if (current) {
      handleFinal();
    }
  }, [start, amount, current]);

  if (!current || typeof current !== "object") {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h2>CURRENCY CONVERTER</h2>
      <label htmlFor="">
        Amount(NGN)
        <input
          type="number"
          value={start}
          min="0"
          onChange={(e) => setStart(e.target.value)}
        />
      </label>{" "}
      <br />
      <label htmlFor="">
        convert to:
        <select value={amount} onChange={(e) => setAmount(e.target.value)}>
          {Object.entries(current).map(([currency]) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </label>{" "}
      <br />
      <h3>Converted amount</h3>
      <p>
        {start} NGN ={" "}
        <strong>
          {final} {amount}
        </strong>
      </p>
    </>
  );
};

export default ApiPage;
