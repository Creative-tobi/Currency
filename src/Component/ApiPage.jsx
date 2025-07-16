import React, { useEffect, useState } from 'react'
import axios from 'axios';

const ApiPage = () => {
    const [current, setCurrent] = useState([]);

    // const apikey = ("process.env.NEXT_PUBLIC_MY_API")
    // const apiKey = import.process.env.VITE_MY_API;

    const Api = async () => {
        try {
            const result = await axios.get(
              `https://v6.exchangerate-api.com/v6/${import.meta.env.VITE_MY_API}/latest/USD`
            );
            console.log(result);
            
        } catch (error) {
            console.log(error);
            
        }
    };

    useEffect(()=>{
        Api();
    }, []);


  return (
    <>
    </>
  )
}

export default ApiPage
