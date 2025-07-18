import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { MdOutlineSwapVerticalCircle } from 'react-icons/md';
import "../Component/ApiStyle.css"

const Consume = () => {
  const [mainCurrent, setMainCurrent] = useState(null);
  const [start, setStart] = useState(1)
  const [conversion, setConversion] = useState("USD");
  const [finalPrice, setFinalPrice] = useState(null);

  const res = async () => {
    try {
      const resApi = await axios.get( `https://v6.exchangerate-api.com/v6/${
          import.meta.env.VITE_MY_API
        }/latest/NGN`);
        setMainCurrent(resApi.data.conversion_rates);
        console.log(resApi.data.conversion_rates);
        
    } catch (error) {
      console.log(error);
       
    }
  }

  useEffect(()=>{
    res();
  }, [])

  const handleFinalPrice = () => {
    if (!mainCurrent || !conversion) return;
    const price = mainCurrent[conversion];
    const converted = (start * price).toFixed(2);
    setFinalPrice(converted);
  }

  useEffect(()=>{
    if(mainCurrent){
      handleFinalPrice()
    }
  }, [mainCurrent, start, conversion])

  if(!mainCurrent || typeof mainCurrent !== "object"){
   return <p></p>;
  }
  return (
    <>
      <div className="first">
        <div className="childOne">
          <h3>Swap Currency</h3>
          <div className="hello">
            <p>Nigeria Currency</p>
            <h3>NGN</h3>
          </div>{" "}
          <br />
          <input
          placeholder='0.00'
            type="number"
            min="0"
            id='input' className='text-center'
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </div>

        {/* <div className="icon">
          <MdOutlineSwapVerticalCircle id="icon" />
        </div> */}

        <div className="childTwo">
          {/* <h3>Converted To:</h3> */}
          <div className="hello">
            <h3>Converted To:</h3>
            {/* <p>{conversion} Currency</p> */}
            <select
              name=""
              id=""
              value={conversion}
              onChange={(e) => setConversion(e.target.value)}>
              {Object.entries(mainCurrent).map(([currency]) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>{" "}
          <br />
          <p id="final">{finalPrice}</p>
          <p>{conversion} Currency</p>
        </div>
      </div>
    </>
  );
}

export default Consume;
